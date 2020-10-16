import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { Cardapio } from 'src/app/models/cardapio.model';
import { CardapioService } from 'src/app/services/cardapio/cardapio.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {

  private id: number = null;
  // public header = null;
  public item: Cardapio;

  constructor(private route: ActivatedRoute, private cardapio: CardapioService) {
    this.id = Number(this.route.snapshot.params['id']);
    this.item = cardapio.search(this.id);
    // this.item = this.getItem(this.id);
    // this.header = new HeaderComponent();
  }
  ngOnInit(): void {}


  // setItem(): void {
  //   let teste = {
  //     teste: 'teste',
  //   };
  //   this.header.teste.push(teste);
  // }
}
