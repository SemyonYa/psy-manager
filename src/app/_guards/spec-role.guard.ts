import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpecRoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.auth.getRole() === 'spec') {
      return true;
    }
    this.router.navigateByUrl('/desktop');
    return false;
  }
}
