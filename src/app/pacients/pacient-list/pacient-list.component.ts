import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Pacient } from '../pacient.model';
import { PacientsService } from '../pacients.service';
import { AuthService } from '../../auth/auth.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-pacient-list',
  templateUrl: './pacient-list.component.html',
  styleUrls: ['./pacient-list.component.css']
})
export class PacientListComponent implements OnInit, OnDestroy {
  pacients: Pacient[] = [];
  isLoading = false;
  totalPacients = 0;
  pacientsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  form: FormGroup;
  private pacientsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public pacientsService: PacientsService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.form = new FormGroup({
      searchTerm: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      searchOption: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.pacientsService.getPacients(this.pacientsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.pacientsSub = this.pacientsService
      .getPacientUpdateListener()
      .subscribe((pacientData: { pacients: Pacient[]; pacientCount: number }) => {
        this.isLoading = false;
        this.totalPacients = pacientData.pacientCount;
        this.pacients = pacientData.pacients;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.pacientsPerPage = pageData.pageSize;
    this.pacientsService.getPacients(this.pacientsPerPage, this.currentPage);
  }

  onDelete(pacientId: string) {
    this.isLoading = true;
    this.pacientsService.deletePacient(pacientId).subscribe(() => {
      this.pacientsService.getPacients(this.pacientsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onSearchPacient() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.pacientsService.getPacients(
      this.pacientsPerPage,
      this.currentPage,
      this.form.value.searchTerm,
      this.form.value.searchOption
    );
    this.form.reset();
  }

  onClearSearch() {
    this.form.reset();
    this.isLoading = true;
    this.pacientsService.getPacients(
      this.pacientsPerPage,
      this.currentPage
    );
  }

  onOpenDialog(pacientId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(pacientId);
      }
    });
  }

  ngOnDestroy() {
    this.pacientsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
