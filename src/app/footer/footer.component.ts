import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { UserService } from '../services/user/user.service';
import { HeaderComponent } from '../header/header.component';
import * as $ from 'jquery';
import { LIBRARY } from 'src/app/app.library';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  loginForm: FormGroup;
  erroLogin: string;

  constructor(private user: UserService, private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['talles@talles.com', [Validators.email, Validators.required]],
      senha: ['teste', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    LIBRARY.carregando();
    const jsonLogin = this.loginForm.getRawValue();
    this.user.getUsuario(jsonLogin.email, jsonLogin.senha).subscribe(
      (data) => {
        localStorage.setItem('token', data.access_token);
        location.reload();
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
          this.erroLogin = 'Login inválido';
        }
        LIBRARY.ocultar();
      }
    );
  }
}
