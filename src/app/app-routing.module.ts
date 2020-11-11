import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { RegistroComponent } from './views/registro/registro.component';
import { EditarComponent } from './views/editar/editar.component';
import { CadCardapioComponent } from './views/cad-cardapio/cad-cardapio.component';
import { ItemComponent } from './views/item/item.component';
import { CardapioComponent } from './views/cardapio/cardapio.component';
import { RestauranteComponent } from './views/restaurante/restaurante.component';
import { CadastrarItemComponent } from './views/cadastrar-item/cadastrar-item.component';
import { EditarItemComponent } from './views/editar-item/editar-item.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { BuscarComponent } from './views/buscar/buscar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'registro', component: RegistroComponent},
  { path: 'editar', component: EditarComponent,  canActivate: [ AuthGuardService] },
  { path: 'cad-cardapio', component: CadCardapioComponent,  canActivate: [ AuthGuardService] },
  { path: 'item/:id', component: ItemComponent },
  { path: 'cardapio/:id', component: CardapioComponent },
  { path: 'restaurante', component: RestauranteComponent },
  { path: 'cadastrar-item', component: CadastrarItemComponent,  canActivate: [ AuthGuardService] },
  { path: 'editar-item/:id', component: EditarItemComponent,  canActivate: [ AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
