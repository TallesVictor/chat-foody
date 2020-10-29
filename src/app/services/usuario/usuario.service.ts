import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private userService: UserService) {}


}
