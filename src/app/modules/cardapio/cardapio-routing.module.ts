import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../guards/auth-guard.service';

import { CardapioComponent } from './cardapio.component';

const cardapioRoutes: Routes = [
  {
    path: '',
    component: CardapioComponent,
    //canActivateChild: [ ItemGuard ],
    children: [
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(cardapioRoutes)],
  exports: [RouterModule],
})
export class CardapioRountigModule {}
