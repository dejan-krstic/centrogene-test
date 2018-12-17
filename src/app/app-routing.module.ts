import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientListComponent } from './pacients/pacient-list/pacient-list.component';
import { PacientCreateComponent } from './pacients/pacient-create/pacient-create.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: PacientListComponent },
  { path: 'create', component: PacientCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:pacientId', component: PacientCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
