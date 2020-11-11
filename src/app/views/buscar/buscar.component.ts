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
  constructor(private buscarService: BuscarService, private router: Router) {

    this.pesquisar = "Arroz";
  }

  ngOnInit(): void {}

  search(): void {
    $('#icone').removeClass('fa-search fa-2x');
    $('#icone').addClass('fa-spinner fa-spin fa-2x');
    this.buscarService.buscar(this.pesquisar).subscribe(
      (data) => {
        this.buscar = data;
        $('#icone').removeClass('fa-spinner fa-spin fa-2x');
        $('#icone').addClass('fa-search fa-2x');
      },
      (error) => {}
    );
  }

  prato(id: number): void{
    this.router.navigate([`/item/${id}`]);
  }
}
