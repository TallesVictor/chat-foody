import { Component, OnInit } from '@angular/core';
import { LIBRARY } from 'src/app/app.library';
import { Buscar } from 'src/app/models/buscar.model';
import { CarrinhoService } from 'src/app/services/carrinho/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  public buscar: Buscar[];
  constructor(private carrinhoService: CarrinhoService) {
    LIBRARY.carregando();
    carrinhoService.buscar(JSON.stringify(carrinhoService.getItem())).subscribe(
      (data) => {
        this.buscar = data;
        LIBRARY.ocultar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}

  remover(id: number): void {
    const objIndex = this.buscar.findIndex((obj) => obj.prato_id === id);
    if (objIndex > -1) {
      this.buscar.splice(objIndex, 1);
    }

    let arrItem = [];
    this.buscar.forEach((item) => {
      arrItem.push(item.prato_id);
    });

    localStorage.setItem('ITEM', JSON.stringify(arrItem));
    $('#carrinho').html('' + this.carrinhoService.getItemLength());
  }

  enviarMensagem(): void {
    const celular = '5531998333325';

    let texto = 'Olá, tudo bem?\nDesejo:';

    this.buscar.forEach((item) => {
      texto += '\n  -*' + item.nome + '*';
    });

    texto += '\nObrigado!';
    texto = window.encodeURIComponent(texto);

    window.open(
      'https://api.whatsapp.com/send?phone=' + celular + '&text=' + texto,
      '__system'
    );
  }
}
