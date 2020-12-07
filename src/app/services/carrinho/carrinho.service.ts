import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TOKEN, URL_API } from 'src/app/app.api';
import { Buscar } from 'src/app/models/buscar.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: TOKEN,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  constructor(private http: HttpClient) {}

  buscar(pesquisar: string): Observable<Buscar[]> {
    return this.http.get<Buscar[]>(
      `${URL_API}/prato/search_id/${pesquisar}`,
      httpOptions
    );
  }

  getItemLength(): number {
    if (localStorage.getItem('ITEM')) {
      return Number(JSON.parse(localStorage.getItem('ITEM')).length);
    }
    return 0;
  }

  getItem(): [] {
    if (localStorage.getItem('ITEM')) {
      return JSON.parse(localStorage.getItem('ITEM'));
    }
    return null;
  }

  addItem(id: number): void {
    if (!localStorage.getItem('ITEM')) {
      localStorage.setItem('ITEM', JSON.stringify([]));
    }

    let item = JSON.parse(localStorage.getItem('ITEM'));
    if (item.indexOf(id) === -1) {
      item.push(id);
      localStorage.setItem('ITEM', JSON.stringify(item));
      $('#carrinho').html('' + this.getItemLength());
    }
  }

}
