import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cardapio } from 'src/app/models/cardapio.model';
import { CardapioService } from 'src/app/services/cardapio/cardapio.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
})
export class CardapioComponent implements OnInit {

  public cardapios: Array<Cardapio>;

  // constructor(cardapio: CardapioService) {
  //   this.cardapios = cardapio.getAll();
  // }

  constructor(private router: Router, private cardapioService: CardapioService) {
    this.cardapioService.getAll().subscribe((data: Cardapio[]) => {
      this.cardapios = data;
    });
 }

  ngOnInit(): void {
  }

  deletar(id: number){
    this.cardapioService.deletar(id).subscribe((respota: any) => {

      this.cardapioService.getAll().subscribe((data: Cardapio[]) => {
        this.cardapios = data;
      });

    });
  }
}
