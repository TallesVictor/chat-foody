import { Component, NgModule, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Usuario } from '../../models/usuario.model';
import { Restaurante } from '../../models/restaurante.model';
import { RestauranteService } from '../../services/restaurante/restaurante.service';
import { LIBRARY } from 'src/app/app.library';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  cadastrarForm: FormGroup;
  public avisoSenhaAux = '';
  public erro = '';
  public sucesso = '';
  constructor(
    private restauranteServ: RestauranteService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.cadastrarForm = fb.group({
      proprietario: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(4)]],
      confirmacao_senha: ['', [Validators.required, Validators.minLength(4)]],
      telefone: ['', [Validators.required, Validators.minLength(11)]],
      descricao: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(1000),
        ],
      ],
      cnpj: ['', [Validators.required, LIBRARY.cnpjValidation]],
      razao_social: ['', [Validators.required]],
      cep: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
        ],
      ],
      estado: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      complemento: ['', []],
    });
  }

  ngOnInit(): void {}

  cadastrar(): void {
    LIBRARY.carregando();
    const jsonRegistro = this.cadastrarForm.getRawValue();

    const jsonLogin = {
      name: jsonRegistro.proprietario,
      email: jsonRegistro.email,
      password: jsonRegistro.senha,
      password_confirmation: jsonRegistro.confirmacao_senha,
    };
    this.userService.salvar(jsonLogin).subscribe(
      (data) => {

        jsonRegistro.user = data.user;
        this.restauranteServ.salvar(jsonRegistro).subscribe(
          (data) => {
            this.sucesso = 'Sucesso ao cadastrar';
            this.erro = '';
            LIBRARY.ocultar();
          },
          (error) => {
            console.log(error);
            this.erro =
              'Erro ao cadastrar restaurante, revise os campos e tente novamente';
            this.sucesso = '';
            LIBRARY.ocultar();
          }
        );
      },
      (error) => {
        console.log(error);
        this.erro =
          'Erro ao cadastrar usuário, revise os campos e tente novamente';
        this.sucesso = '';
        LIBRARY.ocultar();
      }
    );
  }

  conferirSenha(): void {
    const btnCadastrar = document.getElementById(
      'btnCadastrar'
    ) as HTMLInputElement;

    const senha = this.cadastrarForm.get('senha').value;
    const senhaAux = this.cadastrarForm.get('confirmacao_senha').value;

    if (senha !== senhaAux) {
      btnCadastrar.disabled = true;
      this.avisoSenhaAux = 'Senhas estão diferentes';
    } else {
      btnCadastrar.disabled = false;

      this.avisoSenhaAux = '';
    }
  }

  consultaCNPJ(): void {
    this.restauranteServ
      .consultaCNPJ(this.cadastrarForm.get('cnpj').value)
      .subscribe(
        (data) => {
          this.cadastrarForm.get('razao_social').setValue(data.nome);
          this.cadastrarForm.get('cep').setValue(data.cep);
          this.cadastrarForm.get('estado').setValue(data.uf);
          this.cadastrarForm.get('cidade').setValue(data.municipio);
          this.cadastrarForm.get('rua').setValue(data.logradouro);
          this.cadastrarForm.get('numero').setValue(data.numero);
          this.cadastrarForm.get('complemento').setValue(data.complemento);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
