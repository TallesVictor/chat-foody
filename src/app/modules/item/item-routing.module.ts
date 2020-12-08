import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { ItemGuard } from 'src/app/guards/item.guard';
import { CadastrarItemComponent } from './cadastrar-item/cadastrar-item.component';
import { ItemComponent } from './item.component';

const itemRoutes: Routes = [
  {
    path: '',
    component: ItemComponent,
    canActivateChild: [ ItemGuard ],
    children: [
      {
        path: 'cadastrar-item',
        component: CadastrarItemComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(itemRoutes)],
  exports: [RouterModule],
})
export class ItemRoutingModule {}
