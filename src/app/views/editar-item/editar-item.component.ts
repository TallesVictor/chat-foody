import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cardapio } from 'src/app/models/cardapio.model';

import { CardapioService } from 'src/app/services/cardapio/cardapio.service';

@Component({
  selector: 'app-editar-item',
  templateUrl: './editar-item.component.html',
  styleUrls: ['./editar-item.component.css']
})
export class EditarItemComponent implements OnInit {

  public item: Cardapio = {
    id: null,
    nome: null,
    ingredientes: null,
    descricao: null,
    valor: 0.0
  };

  constructor(private routerActive: ActivatedRoute, private router: Router, private cardapioService: CardapioService ) {
    const id = Number(this.routerActive.snapshot.paramMap.get('id'));
    this.cardapioService.getItemById(id).subscribe((cardapio: Cardapio) => {
      this.item = cardapio;
    });
  }

  ngOnInit(): void {
  }

  editar(){
    this.cardapioService.editar(this.item).subscribe((item: Cardapio) => {
      this.router.navigateByUrl('/cardapio');
    });
  }

}
