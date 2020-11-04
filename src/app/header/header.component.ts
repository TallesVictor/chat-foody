import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user/user.service';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { LIBRARY } from 'src/app/app.library';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private usuario: Usuario = new Usuario();
  public logado: Boolean = false;

  constructor(
    private user: UserService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.login();
  }

  login(): void {
    if (localStorage.getItem('token')) {
      LIBRARY.carregando();
      this.user.validToken().subscribe(
        (data) => {
          this.usuario.codigo = 2;
          this.usuario.nome = data.name;
          this.usuario.email = data.email;
          this.logado = true;
          LIBRARY.ocultar();
        },
        (error) => {
          console.log(error.status);
          if (error.status == '401') {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/');
          }
          LIBRARY.ocultar();
        }
      );
    }
  }

  logout() {
    LIBRARY.carregando();
    this.user.logout().subscribe(
      (data) => {
        sessionStorage.removeItem('token');
        location.reload();
      },
      (error) => {
        alert('Erro');
        LIBRARY.ocultar();
      }
    );
  }
}
