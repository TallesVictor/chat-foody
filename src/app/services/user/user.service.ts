import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { URL_API, TOKEN } from '../../app.api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: TOKEN,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  salvar(json): Observable<any> {
    return this.http.post<any>(`${URL_API}/auth/signup`, json, httpOptions);
  }

  editar(json): Observable<any> {
    return this.http.put<any>(
      `${URL_API}/restaurante/alterar`,
      json,
      httpOptions
    );
  }

  getUsuario(email: string, password: string): Observable<User> {
    const user: User = {
      email,
      password,
      authorization: '',
      access_token: null,
      remember_me: false,
    };

    return this.http.post<User>(
      `${URL_API}/auth/login`,
      JSON.parse(JSON.stringify(user))
    );
  }

  validToken(): Observable<any> {
    return this.http.get<any>(`${URL_API}/auth/user`, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${URL_API}/auth/logout`, httpOptions);
  }
}
