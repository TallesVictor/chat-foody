import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user/user.service';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import * as $ from 'jquery';
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
      $('#carregando').show();
      this.user.validToken().subscribe(
        (data) => {
          this.usuario.codigo = 2;
          this.usuario.nome = data.name;
          this.usuario.email = data.email;
          this.logado = true;
          $('#carregando').hide();
        },
        (error) => {
          console.log(error.status);
          if (error.status == '401') {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/');
          }
          $('#carregando').hide();
        }
      );
    }
  }

  logout() {
    $('#carregando').show();
    this.user.logout().subscribe(
      (data) => {
        sessionStorage.removeItem('token');
        location.reload();
      },
      (error) => {
        alert('Erro');
        $('#carregando').hide();
      }
    );
  }
}
