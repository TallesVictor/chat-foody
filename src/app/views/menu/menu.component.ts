import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LIBRARY } from 'src/app/app.library';
import { Menu } from 'src/app/models/menu.model';

import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  public cadastrarForm: FormGroup;
  private cnpj: string;
  private menu: Array<Menu>;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private route: ActivatedRoute
  ) {
    this.cnpj = this.route.snapshot.params['id'];
    this.cadastrarForm = fb.group({
      nome: ['', [Validators.required]],
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
        LIBRARY.ocultar();
        this.menu = data;
        this.cadastrarForm.get('nome').setValue('');
        this.cadastrarForm.get('descricao').setValue('');
      },
      (error) => {
        LIBRARY.ocultar();
        console.log(error);
      }
    );
  }

  salvar(): void {
    LIBRARY.carregando();
    const json = this.cadastrarForm.getRawValue();
    this.menuService.salvar(json).subscribe(
      (data) => {
        LIBRARY.ocultar();
        this.list();
      },
      (error) => {
        LIBRARY.ocultar();
        console.log(error);
      }
    );
  }
  editar(id: number): void {}
  excluir(id: number): void {}
}
