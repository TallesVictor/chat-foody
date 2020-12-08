import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastrarItemComponent } from './cadastrar-item/cadastrar-item.component';
import { ItemRoutingModule } from './item-routing.module';
import { ItemGuard } from 'src/app/guards/item.guard';
@NgModule({
  imports: [
    ItemRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [CadastrarItemComponent],
  providers: [
    ItemGuard,
  ],
})
export class ItemModule {}
