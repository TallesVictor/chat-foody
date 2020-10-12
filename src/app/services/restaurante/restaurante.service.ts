import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URL_API } from 'src/app/app.api';

@Injectable({
  providedIn: 'root',
})
export class RestauranteService {
  constructor(private httpClient: HttpClient) {}

  public consultaCNPJ(cnpj: string): Observable<any> {
    return this.httpClient.get(`${URL_API}/cnpj/` + cnpj.replace(/\D/g, ''));
  }
}
