import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LIBRARY } from 'src/app/app.library';
import { RestauranteService } from 'src/app/services/restaurante/restaurante.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
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
      senha: ['', []],
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
      cnpj: [
        { value: '', disabled: true },
        [Validators.required, LIBRARY.cnpjValidation],
      ],
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

    this.view();
  }

  ngOnInit(): void {}

  editar(): void {
    LIBRARY.carregando();
    const jsonRegistro = this.cadastrarForm.getRawValue();
    this.userService.editar(jsonRegistro).subscribe(
      (data) => {
        this.sucesso = 'Sucesso ao editar';
        this.erro = '';

        setTimeout(() => {
          location.reload();
        }, 1000);

        LIBRARY.ocultar();
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

  conferirSenha(): void {
    const btnCadastrar = document.getElementById(
      'btnEditar'
    ) as HTMLInputElement;

    const senha = this.cadastrarForm.get('senha').value;
    const senhaAux = this.cadastrarForm.get('confirmacao_senha').value;
    if (senha && senha.length > 4) {
      if (senha !== senhaAux) {
        btnCadastrar.disabled = true;
        this.avisoSenhaAux = 'Senhas estão diferentes';
      } else {
        btnCadastrar.disabled = false;

        this.avisoSenhaAux = '';
      }
    } else {
      if (senha) {
        btnCadastrar.disabled = true;
        this.avisoSenhaAux = 'Minimo de 4 caracteres';
      } else {
        btnCadastrar.disabled = false;

        this.avisoSenhaAux = '';
      }
    }
  }

  view(): void {
    LIBRARY.carregando();
    this.restauranteServ.view().subscribe(
      (data) => {
        console.log(data);
        LIBRARY.ocultar();
        this.cadastrarForm.get('cnpj').setValue(data.cnpj);
        this.cadastrarForm.get('email').setValue(data.email);
        this.cadastrarForm.get('descricao').setValue(data.descricao);
        this.cadastrarForm.get('proprietario').setValue(data.proprietario);
        this.cadastrarForm.get('telefone').setValue(data.telefone);
        this.cadastrarForm.get('razao_social').setValue(data.razao_social);
        this.cadastrarForm.get('cep').setValue(data.cep);
        this.cadastrarForm.get('estado').setValue(data.estado);
        this.cadastrarForm.get('cidade').setValue(data.cidade);
        this.cadastrarForm.get('rua').setValue(data.rua);
        this.cadastrarForm.get('numero').setValue(data.numero);
        this.cadastrarForm.get('complemento').setValue(data.complemento);
      },
      (error) => {
        console.log(error);
        LIBRARY.ocultar();
      }
    );
  }
}
