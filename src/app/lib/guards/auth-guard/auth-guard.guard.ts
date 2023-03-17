import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private _router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('currentUser')) {
        return true;
      }
      this._router.navigate(['/account/login']);
      return false;
    }
  
}
