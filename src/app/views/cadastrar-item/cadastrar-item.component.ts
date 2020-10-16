import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cardapio } from 'src/app/models/cardapio.model';
import { CardapioService } from 'src/app/services/cardapio/cardapio.service';

@Component({
  selector: 'app-cadastrar-item',
  templateUrl: './cadastrar-item.component.html',
  styleUrls: ['./cadastrar-item.component.css']
})
export class CadastrarItemComponent implements OnInit {

  public item: Cardapio = {
    id: null,
    nome: null,
    ingredientes: null,
    descricao: null,
    valor: 0.0
  };

  constructor(private router: Router, private cardapioService: CardapioService ) { }

  ngOnInit(): void {
  }

  cadastrar() {
    this.cardapioService.cadastrar(this.item);
    this.router.navigateByUrl('/cardapio');
  }
}
