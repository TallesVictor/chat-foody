import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { RegistroComponent } from './modules/registro/registro.component';
import { RestauranteComponent } from './views/restaurante/restaurante.component';
import { BuscarComponent } from './views/buscar/buscar.component';
import { MenuComponent } from './views/menu/menu.component';
import { CardapioComponent } from './modules/cardapio/cardapio.component';
import { CarrinhoComponent } from './views/carrinho/carrinho.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'item/:id',
    loadChildren: () =>
      import('src/app/modules/item/item.module').then((m) => m.ItemModule),
  },
  { path: 'menu', component: MenuComponent },
  { path: 'restaurante', component: RestauranteComponent },
  { path: 'cardapio/:menu', component: CardapioComponent },
  { path: 'carrinho', component: CarrinhoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
