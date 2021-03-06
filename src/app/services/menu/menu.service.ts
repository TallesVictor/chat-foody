import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Menu } from 'src/app/models/menu.model';
import { URL_API, TOKEN } from '../../app.api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: TOKEN,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  salvar(json): Observable<Menu> {
    return this.http.post<Menu>(
      `${URL_API}/cardapio/salvar`,
      json,
      httpOptions
    );
  }

  editar(json): Observable<Menu> {
    return this.http.post<Menu>(
      `${URL_API}/cardapio/alterar`,
      json,
      httpOptions
    );
  }

  list(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${URL_API}/cardapio`, httpOptions);
  }

  apagar(id): Observable<Number> {
    return this.http.delete<Number>(
      `${URL_API}/cardapio/apagar/${id}`,
      httpOptions
    );
  }
}
