import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LIBRARY } from 'src/app/app.library';

import { Cardapio } from 'src/app/models/cardapio.model';
import { CardapioService } from 'src/app/services/cardapio/cardapio.service';

import * as $ from 'jquery';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
})
export class CardapioComponent implements OnInit {
  private id: number;
  private typeFile: string;
  public cardapios: Array<Cardapio>;
  public erro: string;
  public preco: string;
  public cadastrarForm: FormGroup;
  public imgEdit: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private cardapioService: CardapioService
  ) {
    this.id = Number(this.route.snapshot.params['menu']);

    this.cadastrarForm = fb.group({
      id: ['', []],
      nome: ['', [Validators.required]],
      cardapio_id: [this.id, [Validators.required]],
      ingredientes: ['', [Validators.required]],
      url: ['', []],
      preco: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(6)],
      ],
    });
    this.list();
  }

  ngOnInit(): void {}

  list(): void {
    LIBRARY.carregando();
    this.cardapioService.getAll(this.id).subscribe((data: Cardapio[]) => {
      this.cardapios = data;
      LIBRARY.ocultar();
    });
  }

  handleFileSelect(): void {
    let element = document.getElementById('file') as HTMLInputElement;
    let file = element.files[0];
    console.log('Oks');
    if (file) {
      this.typeFile = file.type;
      let reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    } else if (this.cadastrarForm.get('id').value) {
      console.log('Ok');
      this.salvar('vazio');
    }
  }

  _handleReaderLoaded(readerEvt): void {
    let binaryString = readerEvt.target.result;
    this.salvar('data:' + this.typeFile + ';base64,' + btoa(binaryString));
  }

  verificar(name, valid, message): void {
    return LIBRARY.verificar(name, valid, message, this.cadastrarForm);
  }

  public open(content): void {
    this.imgEdit = null;
    this.modalService.open(content);
  }

  public close(): void {
    this.modalService.dismissAll();
  }

  public salvar(base64: String): void {
    if (!base64) {
      this.handleFileSelect();
      return;
    }

    if (base64 === 'vazio') {
      base64 = '';
    }
    this.cadastrarForm.get('url').setValue(base64);

    LIBRARY.carregando();
    if (this.cadastrarForm.invalid || this.cadastrarForm.pending) {
      LIBRARY.ocultar();
      return;
    }

    this.cadastrarForm
      .get('ingredientes')
      .setValue(this.cadastrarForm.get('ingredientes').value.split(','));
    const json = this.cadastrarForm.getRawValue();

    let acao;
    if (this.cadastrarForm.get('id').value) {
      acao = this.cardapioService.editar(json);
    } else {
      acao = this.cardapioService.cadastrar(json);
    }

    acao.subscribe(
      (data) => {
        LIBRARY.ocultar();
        if (this.cadastrarForm.get('id').value) {
          this.list();
        }else{
          this.cardapios.push(data);
        }
        this.close();
      },
      (error) => {
        LIBRARY.ocultar();
        console.log(error);
      }
    );
  }

  editar(id, nome, valor, ingredientes, url: string, modal): void {
    this.open(modal);
    this.imgEdit = url;
    let listaIngredientes = '';
    this.cadastrarForm.get('id').setValue(id);
    this.cadastrarForm.get('nome').setValue(nome);
    this.cadastrarForm.get('preco').setValue(valor);
    ingredientes.forEach((ingrediente, count) => {
      if (ingredientes[count + 1]) {
        listaIngredientes += `${ingrediente} ,`;
      } else {
        listaIngredientes += `${ingrediente}`;
      }
    });
    this.cadastrarForm.get('ingredientes').setValue(listaIngredientes);
  }

  deletar(id: number): any {
    LIBRARY.carregando();
    this.cardapioService.deletarPrato(id).subscribe(
      (data) => {
        const objIndex = this.cardapios.findIndex((obj) => obj.id === id);
        if (objIndex > -1) {
          this.cardapios.splice(objIndex, 1);
        }
        LIBRARY.ocultar();
      },
      (error) => {
        console.log(error);
        LIBRARY.ocultar();
      }
    );
  }
}
