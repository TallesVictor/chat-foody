import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { TOKEN, URL_API } from '../../app.api';
import { Cardapio } from '../../models/cardapio.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': TOKEN})
};

@Injectable({
  providedIn: 'root',
})
export class CardapioService {


  constructor(private http: HttpClient) {

  }


  cadastrar(item: JSON): Observable<Cardapio>{
    return this.http.post<Cardapio>(`${URL_API}/prato/create`, item, httpOptions);
  }

  editar(item: Cardapio): Observable<any>{
    const itemPostAlterar = JSON.stringify(item);
    return this.http.post(`${URL_API}/prato/atualizar`, itemPostAlterar, httpOptions);
  }

  getItemById(id: number): Observable<Cardapio>{
    return this.http.get<Cardapio>(`${URL_API}/prato/` + id);
  }

  getAll(id: number): Observable<Cardapio[]>{
    return this.http.get<Cardapio[]>(`${URL_API}/prato/` + id);
  }

  deletar(id: number): Observable<any>{
    return this.http.delete(`${URL_API}/cardapio/apagar/` + id, httpOptions);
  }

  deletarPrato(id: number): Observable<any>{
    return this.http.delete(`${URL_API}/prato/` + id, httpOptions);
  }


}
