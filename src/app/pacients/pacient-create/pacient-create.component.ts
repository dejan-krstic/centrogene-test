import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { PacientsService } from '../pacients.service';
import { Pacient } from '../pacient.model';
import { mimeType } from './mime-type.validator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-pacient-create',
  templateUrl: './pacient-create.component.html',
  styleUrls: ['./pacient-create.component.css']
})
export class PacientCreateComponent implements OnInit, OnDestroy {
  pacient: Pacient;
  isLoading = false;
  form: FormGroup;
  imagePreview: any;
  private mode = 'create';
  private pacientId: string;
  private authStatusSub: Subscription;

  constructor(
    public pacientsService: PacientsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      birthdate: new FormControl(null, {
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      condition: new FormControl(null),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('pacientId')) {
        this.mode = 'edit';
        this.pacientId = paramMap.get('pacientId');
        this.isLoading = true;
        this.pacientsService.getPacient(this.pacientId).subscribe(pacientData => {
          this.isLoading = false;
          this.pacient = {
            id: pacientData._id,
            name: pacientData.name,
            birthdate: pacientData.birthdate,
            address: pacientData.address,
            condition: pacientData.condition,
            imagePath: pacientData.imagePath,
            creator: pacientData.creator
          };
          this.form.setValue({
            name: this.pacient.name,
            birthdate: this.pacient.birthdate,
            address: this.pacient.address,
            condition: this.pacient.condition,
            image: this.pacient.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.pacientId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSavePacient() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.pacientsService.addPacient(
        this.form.value.name,
        this.form.value.birthdate.toDateString().slice(3),
        this.form.value.address,
        this.form.value.condition,
        this.form.value.image
      );
    } else {
      this.pacientsService.updatePacient(
        this.pacientId,
        this.form.value.name,
        this.form.value.birthdate.toDateString().slice(3),
        this.form.value.address,
        this.form.value.condition,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
