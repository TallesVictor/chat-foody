import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {RegistroRountigModule} from './registro-routing.module';

import { RegistroComponent} from '../registro/registro.component';
import { EditarComponent } from './editar/editar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RegistroComponent, EditarComponent],
  imports: [
    RegistroRountigModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class RegistroModule {}
