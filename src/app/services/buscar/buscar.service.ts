import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TOKEN, URL_API } from 'src/app/app.api';
import { Buscar } from '../../models/buscar.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: TOKEN,
  }),
};

@Injectable({
  providedIn: 'root',
})

export class BuscarService {
  constructor(private http: HttpClient) {}

  buscar(pesquisar: string): Observable<Buscar[]> {
    return this.http.get<Buscar[]>(`${URL_API}/prato/search/${pesquisar}`, httpOptions);
  }
}
