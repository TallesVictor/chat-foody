import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URL_API, TOKEN } from 'src/app/app.api';
import { Restaurante } from 'src/app/models/restaurante.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: TOKEN,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class RestauranteService {
  constructor(private http: HttpClient) {}

  public consultaCNPJ(cnpj: string): Observable<any> {
    return this.http.get(`${URL_API}/cnpj/` + cnpj.replace(/\D/g, ''));
  }

  salvar(json: JSON): Observable<any> {
    return this.http.post<any>(
      `${URL_API}/restaurante/salvar`,
      json,
      httpOptions
    );
  }

  view(): Observable<any> {
    return this.http.get<Restaurante>(
      `${URL_API}/restaurante/view`,
      httpOptions
    );
  }

}
