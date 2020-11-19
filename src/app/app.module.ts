import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { RegistroComponent } from './views/registro/registro.component';
import { EditarComponent } from './views/editar/editar.component';
import { CadCardapioComponent } from './views/cad-cardapio/cad-cardapio.component';
import { ItemComponent } from './views/item/item.component';
import { CardapioComponent } from './views/cardapio/cardapio.component';
import { RestauranteComponent } from './views/restaurante/restaurante.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrarItemComponent } from './views/cadastrar-item/cadastrar-item.component';
import { EditarItemComponent } from './views/editar-item/editar-item.component';
import { BuscarComponent } from './views/buscar/buscar.component';
import { MenuComponent } from './views/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    EditarComponent,
    CadCardapioComponent,
    ItemComponent,
    CardapioComponent,
    RestauranteComponent,
    HeaderComponent,
    FooterComponent,
    CadastrarItemComponent,
    EditarItemComponent,
    BuscarComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
