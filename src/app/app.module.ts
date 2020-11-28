import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

import { HomeComponent } from './views/home/home.component';
import { ItemComponent } from './views/item/item.component';
import { CardapioComponent } from './modules/cardapio/cardapio.component';
import { RestauranteComponent } from './views/restaurante/restaurante.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrarItemComponent } from './views/cadastrar-item/cadastrar-item.component';
import { EditarItemComponent } from './views/editar-item/editar-item.component';
import { BuscarComponent } from './views/buscar/buscar.component';
import { MenuComponent } from './views/menu/menu.component';

import { RegistroModule } from './modules/registro/registro.module';
import { CardapioModule } from './modules/cardapio/cardapio.module';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    ReactiveFormsModule,
    RegistroModule,
    CardapioModule
  ],
  providers: [

    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
  },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
