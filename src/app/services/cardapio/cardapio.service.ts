import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/Http';

import { Observable } from 'rxjs';
import { URL_API } from '../../app.api';
import { Cardapio } from '../../models/cardapio.model';

@Injectable({
  providedIn: 'root',
})
export class CardapioService {
  cardapio: Array<Cardapio> = [
    {
      id: 0,
      descricao:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo delectus...',
      nome: 'Grilled Caesar',
      ingredientes: ['Arroz', 'Brocolis', 'Bacon', 'Camarao'],
      valor: 12.0,
    },
    {
      id: 1,
      nome: 'Bacon wrapped wild gulf prawns',
      ingredientes: ['Arroz', 'Brocolis', 'Bacon', 'Camarao'],
      descricao:
        'Lorem Architecto illo delectus ipsum dolor sit amet consectetur adipisicing elit...',
      valor: 16.0,
    },
    {
      id: 2,
      nome: 'Spicy Calamari',
      ingredientes: ['Arroz', 'Brocolis', 'Bacon', 'Camarao'],
      descricao:
        'Lorem adipisicing elit. Architecto illo delectus  ipsum dolor sit amet consectetur ...',
      valor: 21.0,
    },
    {
      id: 3,
      nome: 'Seared ahi tuna fillet*',
      ingredientes: ['Arroz', 'Brocolis', 'Bacon', 'Camarao'],
      descricao:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo delectus...',
      valor: 15.0,
    },
    {
      id: 4,
      nome: 'Grilled Caesar salad',
      ingredientes: ['Arroz', 'Brocolis', 'Bacon', 'Camarao'],
      descricao:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo delectus...',
      valor: 12.0,
    },
    {
      id: 5,
      nome: 'Spicy Calamari and beans',
      ingredientes: ['Arroz', 'Brocolis', 'Bacon', 'Camarao'],
      descricao:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo delectus...',
      valor: 40.0,
    },
    {
      id: 6,
      nome: 'Seared fillet',
      ingredientes: ['Arroz', 'Brocolis', 'Bacon', 'Camarao'],
      descricao:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo delectus...',
      valor: 12.0,
    },
  ];

  constructor(private http: HttpClient) {

    this.teste().subscribe(
      (data) => {
      console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  teste(): Observable<any> {

    const cad: Cardapio = {
      id: 2,
      nome: 'Spicy Calamari',
      ingredientes: ['Arroz', 'Brocolis', 'Bacon', 'Camarao'],
      descricao:
        'Lorem adipisicing elit. Architecto illo delectus  ipsum dolor sit amet consectetur ...',
      valor: 21.0,
    };

    return this.http.post<Cardapio>(`${URL_API}/cardapio`, JSON.parse(JSON.stringify(cad)));
  }

  cadastrar(item: Cardapio){
    const id = this.cardapio.length + 2;
    item.id = id;

    this.cardapio.push(item);
  }

  editar(item: Cardapio){
    for (let obj of this.cardapio){
      if (item.id === obj.id){
        obj = item;
        break;
      }
    }
  }

  getItemById(id: number){
    for (const obj of this.cardapio){
      if (id === obj.id){
        return obj;
      }
    }
    return null;
  }

  getAll(): Array<Cardapio> {
    return this.cardapio;
  }

  deletar(id: number){
    for (let i = 0; i < this.cardapio.length; i++){
      if (id === this.cardapio[i].id){
        this.cardapio.splice(i, 1);
        break;
      }
    }
  }

  search(id: number): Cardapio {
    for (let card of this.cardapio) {
      if (id == card.id) {
        return card;
      }
    }
  }

}
