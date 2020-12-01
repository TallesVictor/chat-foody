import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  CanActivateChild,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class ItemGuard implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
