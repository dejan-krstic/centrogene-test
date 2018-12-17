import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PacientCreateComponent } from './pacient-create/pacient-create.component';
import { PacientListComponent } from './pacient-list/pacient-list.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [PacientCreateComponent, PacientListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class PacientsModule {}
