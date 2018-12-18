import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PacientCreateComponent } from './pacient-create/pacient-create.component';
import { PacientListComponent } from './pacient-list/pacient-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [PacientCreateComponent, PacientListComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class PacientsModule {}
