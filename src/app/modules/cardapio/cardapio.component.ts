import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cardapio } from 'src/app/models/cardapio.model';
import { CardapioService } from 'src/app/services/cardapio/cardapio.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
})
export class CardapioComponent implements OnInit {
  public cardapios: Array<Cardapio>;
  private id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cardapioService: CardapioService
  ) {
    this.id = Number(this.route.snapshot.params['menu']);
    console.log(this.id)
    this.cardapioService.getAll(this.id).subscribe((data: Cardapio[]) => {
      this.cardapios = data;
    });
  }

  ngOnInit(): void {
    // sessionStorage.setItem("lastname", "Smith");
  }

  // deletar(id: number) {
  //   this.cardapioService.deletar(id).subscribe((respota: any) => {
  //     this.cardapioService.getAll().subscribe((data: Cardapio[]) => {
  //       this.cardapios = data;
  //     });
  //   });
  // }
}
