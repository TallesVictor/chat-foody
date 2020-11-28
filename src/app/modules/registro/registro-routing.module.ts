import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../guards/auth-guard.service';

import { EditarComponent } from './editar/editar.component';

const registroRoutes: Routes = [
  {
    path: 'editar',
    component: EditarComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(registroRoutes)],
  exports: [RouterModule],
})
export class RegistroRountigModule {}
