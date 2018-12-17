import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Pacient } from './pacient.model';

const BACKEND_URL = environment.apiUrl + '/pacients/';

@Injectable({ providedIn: 'root' })
export class PacientsService {
  private pacients: Pacient[] = [];
  private pacientsUpdated = new Subject<{ pacients: Pacient[]; pacientCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPacients(pacientsPerPage: number, currentPage: number, searchTerm?: string, searchOption?: string) {
    const queryParams = `?pagesize=${pacientsPerPage}&page=${currentPage}` +
      (searchTerm && searchOption ? `&searchterm=${searchTerm}&searchoption=${searchOption}` : '');
    this.http
      .get<{ message: string; pacients: any; maxPacients: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(pacientData => {
          return {
            pacients: pacientData.pacients.map(pacient => {
              return {
                name: pacient.name,
                birthdate: pacient.birthdate,
                address: pacient.address,
                condition: pacient.condition,
                id: pacient._id,
                imagePath: pacient.imagePath,
                creator: pacient.creator
              };
            }),
            maxPacients: pacientData.maxPacients
          };
        })
      )
      .subscribe(transformedPacientData => {
        this.pacients = transformedPacientData.pacients;
        this.pacientsUpdated.next({
          pacients: [...this.pacients],
          pacientCount: transformedPacientData.maxPacients
        });
      });
  }

  getPacientUpdateListener() {
    return this.pacientsUpdated.asObservable();
  }

  getPacient(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      birthdate: string;
      address: string;
      condition: string;
      imagePath: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addPacient(name: string, birthdate: string, address: string, condition: string, image: File) {
    const pacientData = new FormData();
    pacientData.append('name', name);
    pacientData.append('birthdate', birthdate);
    pacientData.append('address', address);
    pacientData.append('condition', condition);
    pacientData.append('image', image, name);
    this.http
      .post<{ message: string; pacient: Pacient }>(
        BACKEND_URL,
        pacientData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updatePacient(id: string, name: string, birthdate: string, address: string, condition: string, image: File | string) {
    let pacientData: Pacient | FormData;
    if (typeof image === 'object') {
      pacientData = new FormData();
      pacientData.append('id', id);
      pacientData.append('name', name);
      pacientData.append('birthdate', birthdate);
      pacientData.append('address', address);
      pacientData.append('condition', condition);
      pacientData.append('image', image, name);
    } else {
      pacientData = {
        id: id,
        name: name,
        birthdate: birthdate,
        address: address,
        condition: condition,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put(BACKEND_URL + id, pacientData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deletePacient(pacientId: string) {
    return this.http.delete(BACKEND_URL + pacientId);
  }
}
