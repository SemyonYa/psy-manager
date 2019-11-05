import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private alertCtrl: AlertController) { }

  canActivate(): Observable<boolean> {
    return this.authService.authData
      .asObservable()
      .pipe(
        map((q) => {
          console.log('auth', q);
          if (!q) {
            this.alertCtrl.create({
              header: 'Нет доступа',
              message: 'Необходимо авторизоваться.',
              buttons: ['OK']
            }).then(alert => alert.present());

            this.router.navigateByUrl('/login');
            return false;
          } else {
            return true;
          }
        })
      ); // of(this.authService.authToken.value !== '');
  }
}
