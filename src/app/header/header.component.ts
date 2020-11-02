import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user/user.service';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  private usuario: Usuario = new Usuario();
  public  loading = false;
  public logado: Boolean = false;

  constructor(
    private user: UserService,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.logado = this.user.isLogin();
    this.login();
  }


  login(): void {
    if (localStorage.getItem('token')) {


      this.loading = true;
      this.user.validToken().subscribe(
        (data) => {
          this.usuario.codigo = 2;
          this.usuario.nome = data.name;
          this.usuario.email = data.email;
          sessionStorage.setItem('Usuario', JSON.stringify(this.usuario));
          this.loading = false;
        },
        (error) => {
          console.log(error.status);
          if (error.status == '401') {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/');
            this.loading = false;
          }
        }
      );
    }
  }
}
