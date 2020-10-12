import { Component, NgModule, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { Restaurante } from '../../models/restaurante.model';

import { RestauranteService } from '../../services/restaurante/restaurante.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  public usuario: Usuario = {
    codigo: null,
    nome: '',
    email: '',
    senha: '',
    dataNascimento: null,
  };

  public restaurante: Restaurante = {
    cnpj: '',
    razaoSocial: '',
    cep: null,
    estado: '',
    cidade: '',
    rua: '',
    numero: '',
    complemento: '',
  };

  public avisoSenhaAux = '';
  public senhaAux: string;

  // private restauranteServ: RestauranteService;

  constructor(private restauranteServ: RestauranteService) {
    // this.restauranteServ = new RestauranteService();
  }

  ngOnInit(): void {}

  cadastrar(): void {
    console.log(this.usuario, this.restaurante);
  }

  conferirSenha(): void {
    const btnCadastrar = document.getElementById(
      'btnCadastrar'
    ) as HTMLInputElement;

    if (this.usuario.senha != this.senhaAux) {
      btnCadastrar.disabled = true;
      this.avisoSenhaAux = 'Senhas estão diferentes';
    } else {
      btnCadastrar.disabled = false;

      this.avisoSenhaAux = '';
    }
  }

  consultaCNPJ(): void {
    this.restauranteServ.consultaCNPJ(this.restaurante.cnpj).subscribe(
      (data) => {
        this.restaurante.razaoSocial = data.nome;
        this.restaurante.cep = data.cep;
        this.restaurante.estado = data.uf;
        this.restaurante.cidade = data.municipio;
        this.restaurante.rua = data.logradouro;
        this.restaurante.numero = data.numero;
        this.restaurante.complemento = data.complemento;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
