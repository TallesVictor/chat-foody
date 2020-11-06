import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): Observable<boolean> | boolean {
    if (localStorage.getItem('token')) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
