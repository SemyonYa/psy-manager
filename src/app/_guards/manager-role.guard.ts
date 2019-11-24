import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerRoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.auth.getRole() === 'manager') {
      return true;
    }
    this.router.navigateByUrl('/desktop');
    return false;
  }

}
