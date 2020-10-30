import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { TOKEN, URL_API } from '../../app.api';
import { Cardapio } from '../../models/cardapio.model';
import { ItemComponent } from 'src/app/views/item/item.component';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': TOKEN})
};

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

  cadastrar(item: Cardapio): Observable<any>{
    //const id = this.cardapio.length + 2;
    //item.id = id;
    const codigo = new Date().getMilliseconds();
    item.id = Number(codigo);

    const itemPost = JSON.stringify(item);

    return this.http.post(`${URL_API}/prato/create`, itemPost, httpOptions);
  }

  editar(item: Cardapio): Observable<any>{
    const itemPostAlterar = JSON.stringify(item);
    return this.http.post(`${URL_API}/cardapio/alterar`, itemPostAlterar, httpOptions);
  }

  getItemById(id: number): Observable<Cardapio>{
    return this.http.get<Cardapio>(`${URL_API}/prato/` + id);
  }

  getAll(): Observable<Cardapio[]> {
    return this.http.get<Cardapio[]>(`${URL_API}/cardapio/6666000111`, httpOptions);
  }

  deletar(id: number): Observable<any>{
    console.log(id);
    return this.http.delete(`${URL_API}/cardapio/apagar/` + id, httpOptions);
  }

  search(id: number): Cardapio {
    for (let card of this.cardapio) {
      if (id == card.id) {
        return card;
      }
    }
  }

}
