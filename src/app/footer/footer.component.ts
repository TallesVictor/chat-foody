import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  usuarios = [{ id: 0, email: 'admin@admin', senha: 'admin' }];
  loguin: boolean = null;
  constructor() {}

  ngOnInit(): void {}

  login() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const pass = (document.getElementById('pass') as HTMLInputElement).value;

    this.usuarios.forEach((element) => {
      if (element.email == email && element.senha == pass) {
        this.loguin = true;
      }
    });

    console.log(email, pass);

    if (this.loguin != true) {
      this.loguin = false;
    }

  }
}
