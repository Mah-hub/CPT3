import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth2Service } from '../services/auth2.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: Auth2Service, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    return !this.authService.isLoggedIn();
  }
}