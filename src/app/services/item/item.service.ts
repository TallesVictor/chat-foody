import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API, TOKEN } from 'src/app/app.api';
import { Cardapio } from 'src/app/models/cardapio.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: TOKEN,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  list(id: number): Observable<Cardapio> {
    return this.http.get<Cardapio>(`${URL_API}/prato/listItens/${id}`);
  }
}
