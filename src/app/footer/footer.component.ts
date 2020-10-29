import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  usuarios = [{ id: 0, email: 'admin@admin', senha: 'admin' }];
  loguin: Boolean = null;
  email: string = null;
  senha: string = null;

  constructor(private user: UserService) {}

  ngOnInit(): void {}

  login(): void {
    if (this.email && this.senha) {
      this.loguin = this.user.login(this.email, this.senha);
    }else{
      this.loguin = false;
      alert('Email ou senha não preenchido');
    }
  }
}
