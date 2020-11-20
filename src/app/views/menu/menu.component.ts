import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Menu } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu/menu.service';
import { LIBRARY } from 'src/app/app.library';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  public cadastrarForm: FormGroup;
  private cnpj: string;
  public menu: Array<Menu>;
  private closeResult: string;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.cnpj = this.route.snapshot.params['id'];
    this.cadastrarForm = fb.group({
      nome: ['', [Validators.required]],
      codigo: [''],
      descricao: ['', [Validators.required]],
      cnpj: [this.cnpj, [Validators.required]],
    });

    this.list();
  }

  ngOnInit(): void {}

  list(): void {
    LIBRARY.carregando();
    this.menuService.list(this.cnpj).subscribe(
      (data) => {
        this.menu = data;
        this.cadastrarForm.get('nome').setValue('');
        this.cadastrarForm.get('descricao').setValue('');
        LIBRARY.ocultar();
      },
      (error) => {
        LIBRARY.ocultar();
        console.log(error);
      }
    );
  }

  salvar(): void {
    LIBRARY.carregando();
    if (this.cadastrarForm.invalid || this.cadastrarForm.pending) {
      LIBRARY.ocultar();
      return;
    }

    const json = this.cadastrarForm.getRawValue();
    let acao;
    if (this.cadastrarForm.get('codigo').value) {
      acao = this.menuService.editar(json);
    } else {
      acao = this.menuService.salvar(json);
    }
    acao.subscribe(
      (data) => {
        this.list();
        this.close();
        LIBRARY.ocultar();
      },
      (error) => {
        LIBRARY.ocultar();
        console.log(error);
      }
    );
  }

  editar(id: number, nome: string, descricao: string, modal): void {
    this.cadastrarForm.get('codigo').setValue(id);
    this.cadastrarForm.get('nome').setValue(nome);
    this.cadastrarForm.get('descricao').setValue(descricao);
    const json = this.cadastrarForm.getRawValue();
    console.log(json);
    this.open(modal);
  }

  excluir(id: number): void {
    this.menuService.apagar(id).subscribe(
      (data) => {
        this.list();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  verificar(name, valid, message): void {
    return LIBRARY.verificar(name, valid, message, this.cadastrarForm);
  }

  public open(content): void {
    this.modalService.open(content);
  }
  public close(): void {
    this.modalService.dismissAll();
  }

  encodeImageFileAsURL() {
    let element = (document.getElementById('file') as HTMLInputElement);
    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      console.log('RESULT', reader.result);
    };
    reader.readAsDataURL(file);
  }
}
