import { NgModule } from '@angular/core';

import { CadCardapioComponent } from './cad-cardapio/cad-cardapio.component';
import { CardapioRountigModule } from './cardapio-routing.module';

@NgModule({
  imports: [CardapioRountigModule],
  exports: [],
  declarations: [CadCardapioComponent],
  providers: [],
})
export class CardapioModule {}
