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
      proprietario: ['Talles V', [Validators.required]],
      email: ['talles@talless.com', [Validators.email, Validators.required]],
      senha: ['teste', [Validators.required, Validators.minLength(4)]],
      confirmacao_senha: [
        'teste',
        [Validators.required, Validators.minLength(4)],
      ],
      telefone: [
        '31998333325',
        [Validators.required, Validators.minLength(11)],
      ],
      descricao: [
        'Restaurante dedicado ao conforto da familia e seu bem estar, vem tambem',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(1000),
        ],
      ],
      cnpj: [
        '25.025.342/0001-97',
        [Validators.required, LIBRARY.cnpjValidation],
      ],
      razao_social: ['444444', [Validators.required]],
      cep: [
        '32672-138',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
        ],
      ],
      estado: ['333', [Validators.required]],
      cidade: ['333', [Validators.required]],
      numero: ['333', [Validators.required]],
      rua: ['4444', [Validators.required]],
      complemento: ['sssss', []],
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
        console.log(data);

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
