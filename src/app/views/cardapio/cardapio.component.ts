import { Component, OnInit } from '@angular/core';

import { Cardapio } from 'src/app/models/cardapio.model';
import { CardapioService } from 'src/app/services/cardapio/cardapio.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
})
export class CardapioComponent implements OnInit {

  public cardapios: Array<Cardapio>;

  constructor(cardapio: CardapioService) {
    this.cardapios = cardapio.getAll();
  }

  ngOnInit(): void {
  }
}
