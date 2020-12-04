import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LIBRARY } from 'src/app/app.library';
import { Cardapio } from 'src/app/models/cardapio.model';
import { ItemService } from 'src/app/services/item/item.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  private id: number = null;
  // public header = null;
  public item: Cardapio;

  constructor(private route: ActivatedRoute, private itemService: ItemService) {
    this.id = Number(this.route.snapshot.params['id']);
    this.list(this.id);
  }
  ngOnInit(): void {}

  list(id: number): void {
    LIBRARY.carregando();
    this.itemService.list(id).subscribe(
      (data) => {
        LIBRARY.ocultar();
        this.item = data;
      },
      (error) => {
        LIBRARY.ocultar();
        return error;
      }
    );
  }

  addItem(id: number): void {
    if (!localStorage.getItem('ITEM')) {
      localStorage.setItem('ITEM', JSON.stringify([]));
    }

    let item = JSON.parse(localStorage.getItem('ITEM'));
    if (item.indexOf(id) === -1) {
      item.push(id);
      localStorage.setItem('ITEM', JSON.stringify(item));
    }
  }
}
