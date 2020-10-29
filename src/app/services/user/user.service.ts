import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { URL_API } from '../../app.api';
import { TOKEN } from '../../app.api';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': TOKEN})
};

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Boolean {
    this.getUsuario(email, password).subscribe(
      (data) => {
        localStorage.setItem('token', data.access_token);
        return true;
      },
      (error) => {
        console.log(error);
        alert(this.erroLoguin(error.status));
      }
    );
    return false;
  }

  isLogin(): Boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  getUsuario(email: string, password: string): Observable<User> {
    // const user: User = {
    //   email,
    //   password,
    //   token: '',
    //   remember_me: false,
    // };
    const user: User = {
      email: 'talles@talles.com',
      password: 'teste',
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

  erroLoguin(err): String {
    if (err === 401) {
      return 'Loguin inválido';
    }
  }


}
