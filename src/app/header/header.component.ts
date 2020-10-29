import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user/user.service';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuario: Usuario = new Usuario();

  logado: Boolean = false;
  constructor(
    private user: UserService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.logado = this.user.isLogin();

    this.user.validToken().subscribe(
      (data) => {
        this.usuario.codigo = 2;
        this.usuario.nome = data.name;
        this.usuario.email = data.email;
        sessionStorage.setItem('Usuario', JSON.stringify(this.usuario));
      },
      (error) => {}
    );
  }
}
