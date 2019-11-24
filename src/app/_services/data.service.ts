import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Good } from '../_models/good';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Specialist } from '../_models/specialist';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Seance } from '../_models/seance';
import { User } from '../_models/user';
import { Profile } from '../_models/profile';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  specialists = new BehaviorSubject<Specialist[]>([]);
  goods = new BehaviorSubject<Good[]>([]);
  seances = new BehaviorSubject<Seance[]>([]);
  workdays = new BehaviorSubject<number[]>([]);
  users = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  get(url, stringParams = ''): Observable<any> {
    const userId = this.authService.getUserId();
    return this.http.get(url + '?userId=' + userId + stringParams, { headers: this.authService.headers() })
      .pipe(
        catchError(
          err => {
            if (err.status === 401) {
              this.authService.logout();
              this.router.navigateByUrl('/login');
              return of(false);
            }
          }
        ),
      );
  }

  post(url, formData: any): Observable<any> {
    formData.userId = this.authService.getUserId();
    return this.http.post(url, formData, { headers: this.authService.headers() })
      .pipe(
        catchError(
          err => {
            if (err.status === 401) {
              this.authService.logout();
              this.router.navigateByUrl('/login');
              return of(false);
            }
          }
        ),
      );
  }

  ///
  // PROFILE
  ///

  getProfile(id: number) {
    return this.get(environment.host + '/manager-user/open-profile')
      .pipe(
        map(
          (p: any) => new Profile(p.organization_name, p.email, p.phone, p.specialists_quantity, p.img)
        )
      );
  }

  saveProfile(formData) {
    return this.post(environment.host + '/manager-user/save-profile', formData);
  }

  resetPassword(formData) {
    return this.post(environment.host + '/manager-user/reset-password', formData);
  }

  ///
  // USERS
  ///
  getUsers() {
    this.get(environment.host + '/manager-user/all')
      .pipe(
        map(
          (data: any[]) => data.map(u => new User(u.id, u.email, u.phone, u.login, u.specialist_id, u.name, u.specialist_img, u.img))
        )
      )
      .subscribe(
        (data: User[]) => {
          this.users.next(data);
        }
      );
  }

  getUser(id) {
    return this.get(environment.host + '/manager-user/one', '&id=' + id)
      .pipe(
        map(
          (u: any) => new User(u.id, u.email, u.phone, u.login, u.specialist_id, u.name, u.specialist_img, u.img)
        )
      );
  }

  createUser(formData) {
    return this.post(environment.host + '/manager-user/create', formData);
  }

  editUser(formData) {
    return this.post(environment.host + '/manager-user/update', formData);
  }

  deleteUser(id) {
    return this.post(environment.host + '/manager-user/delete', { id });
  }

  resetChildPassword(formData) {
    return this.post(environment.host + '/manager-user/reset-child-password', formData);
  }

  validateCreateUserLogin(login, currentUserId) {
    return this.post(environment.host + '/manager-user/validate-create-user-login', { login, currentUserId })
      .pipe(
        map(
          (resp) => {
            if (resp) {
              return resp;
            } else {
              return null;
            }
          }
        )
      );
  }

  loadLogo(formData) {
    return this.post(environment.host + '/manager-user/load-logo', formData);
  }

  ///
  // SPECIALIST
  ///

  getSpecialists() {
    this.get(environment.host + '/specialist/all')
      .pipe(
        map(
          (data: any[]) => {
            return data.map(s => {
              return new Specialist(s.id, s.name, s.description, s.user_id, s.img);
            });
          }
        )
      )
      .subscribe(
        (data: Specialist[]) => {
          this.specialists.next(data);
        }
      );
  }

  getSpecialist(id) {
    return this.get(environment.host + '/specialist/one', '&id=' + id)
      .pipe(
        map(
          (s: any) => {
            return new Specialist(s.id, s.name, s.description, s.user_id, s.img);
          }
        )
      );
  }

  newSpecialist(formData) {
    return this.post(environment.host + '/specialist/create', formData);
  }

  updateSpecialist(formData) {
    return this.post(environment.host + '/specialist/update', formData);
  }

  deleteSpecialist(id: number) {
    return this.post(environment.host + '/specialist/delete', { id });
  }

  loadSpecialistPhoto(formData) {
    return this.post(environment.host + '/specialist/load-photo', formData);
  }

  ///
  // GOOD
  ///
  getGoods(specialistId) {
    this.get(environment.host + '/good/all', '&specialistId=' + specialistId)
      .pipe(map(
        (data: any[]) => data.map(g => new Good(g.id, g.name, g.description, g.price, g.duration, g.specialist_id, g.invisible))
      ))
      .subscribe(
        (data: Good[]) => this.goods.next(data)
      );
  }

  getGood(id) {
    return this.get(environment.host + '/good/one', '&id=' + id)
      .pipe(map(
        (g: any) => new Good(g.id, g.name, g.description, g.price, g.duration, g.specialist_id, g.invisible)
      ));
  }

  newGood(formData) {
    return this.post(environment.host + '/good/create', formData);
  }

  updateGood(formData) {
    return this.post(environment.host + '/good/update', formData);
  }

  cloneGood(goodId, specialistId) {
    return this.post(environment.host + '/good/clone', { goodId, specialistId });
  }

  deleteGood() {

  }

  ///
  // SEANCES
  ///
  getSeances(specialistId: number, date: string) {
    return this.get(environment.host + '/seance/all', '&specialistId=' + specialistId + '&date=' + date)
      .pipe(
        map(
          (data: any[]) => data.map(s => new Seance(s.id, s.date, s.time, s.duration, s.price, s.seance_status, s.good_id, s.name))
        )
      );
    // .subscribe(
    //   (data: Seance[]) => this.seances.next(data)
    // );
  }

  getSeance(id) {
    return this.get(environment.host + '/seance/one', '&id=' + id)
      .pipe(
        map(
          (s: any) => new Seance(s.id, s.date, s.time, s.duration, s.price, s.seance_status, s.good_id, s.name)
        )
      );
  }

  newSeance(formData) {
    return this.post(environment.host + '/seance/create', formData);
  }

  updateSeance(formData) {
    return this.post(environment.host + '/seance/update', formData);
  }

  deleteSeance(id) {
    return this.post(environment.host + '/seance/delete', { id });
  }

  clearDate(specialistId: number, date: string) {
    return this.post(environment.host + '/seance/clear-date', { date, specialistId });
  }

  getWorkdays(specialistId, year, month) {
    this.post(environment.host + '/seance/workdays', { specialistId, year, month })
      .subscribe(
        (data: number[]) => this.workdays.next(data)
      );
  }

  copyDaySeances(formData) {
    return this.post(environment.host + '/seance/copy-day-seances', formData);
  }

  shareByWeekday(formData) {
    return this.post(environment.host + '/seance/share-by-weekday', formData);
  }

  ///
  // LOGIN, AuthData
  ///
  login(formData) {
    return this.http.post(environment.host + '/auth/login', formData);
  }

  ///
  // VALIDATORS FUNCTIONS
  ///
  checkSpecialistCreateName(name) {
    return this.post(environment.host + '/specialist/check-create-name', { name })
      .pipe(
        map(
          (resp) => {
            if (resp) {
              return { nameIsUsed: true };
            } else {
              return null;
            }
          }
        )
      );
  }

  checkSpecialistEditName(id, name) {
    return this.post(environment.host + '/specialist/check-edit-name', { id, name })
      .pipe(
        map(
          (resp) => {
            if (resp) {
              return { nameIsUsed: true };
            } else {
              return null;
            }
          }
        )
      );
  }

  checkSeanceCreate(specialistId, time, duration, date) {
    return this.post(environment.host + '/seance/check-create', { specialistId, time, duration, date })
      .pipe(
        map(
          (resp) => {
            if (resp) {
              // console.log(resp);
              return resp;
            } else {
              return null;
            }
          }
        )
      );
  }

  checkSeanceEdit(specialistId, time, duration, date, id) {
    return this.post(environment.host + '/seance/check-edit', { specialistId, time, duration, date, id })
      .pipe(
        map(
          (resp) => {
            if (resp) {
              console.log(resp);
              return resp;
            } else {
              return null;
            }
          }
        )
      );
  }
}
