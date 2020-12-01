import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../guards/auth-guard.service';

import { CadCardapioComponent } from './cad-cardapio/cad-cardapio.component';

const cardapioRoutes: Routes = [
  { path: 'cad-cardapio', component: CadCardapioComponent,  canActivate: [ AuthGuardService ] },
];
@NgModule({
  imports: [RouterModule.forChild(cardapioRoutes)],
  exports: [RouterModule],
})
export class CardapioRountigModule { }