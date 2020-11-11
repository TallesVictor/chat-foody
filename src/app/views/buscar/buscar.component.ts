import { Component, OnInit } from '@angular/core';
import { Buscar } from 'src/app/models/buscar.model';

import { BuscarService } from '../../services/buscar/buscar.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  public pesquisar: string;
  public buscar: Buscar[];
  public erro: string;
  constructor(private buscarService: BuscarService, private router: Router) {
    this.pesquisar = 'Arroz';
  }

  ngOnInit(): void {}

  search(): void {
    if(this.pesquisar){
    $('#icone').removeClass('fa-search fa-2x');
    $('#icone').addClass('fa-spinner fa-spin fa-2x');
    this.buscarService.buscar(this.pesquisar).subscribe(
      (data) => {
        this.buscar = data;
        $('#icone').removeClass('fa-spinner fa-spin fa-2x');
        $('#icone').addClass('fa-search fa-2x');
      },
      (error) => {
        if (error.status == '404') {
          this.erro = 'Dados não encontrados, faça outra pesquisa =D';
        } else {
          this.erro = 'Erro não identificado =C';
        }
        $('#icone').removeClass('fa-spinner fa-spin fa-2x');
        $('#icone').addClass('fa-search fa-2x');
      }
    );
  }else{
    this.erro = 'Preencha o campo para a pesquisa =D';
  }
  }

  prato(id: number): void {
    this.router.navigate([`/item/${id}`]);
  }
}
