import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private user: UserService) {}

  login(): Boolean {
    if (this.user.isLogin()) {
      return true;
    }
    return false;
  }
}
