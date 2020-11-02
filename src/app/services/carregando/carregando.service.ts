import { Injectable } from '@angular/core';
import { HeaderComponent } from 'src/app/header/header.component';

@Injectable({
  providedIn: 'root',
})
export class CarregandoService {
  constructor(private header: HeaderComponent) {}

  public carregando(carregar) {
    return carregar;
  }
}
