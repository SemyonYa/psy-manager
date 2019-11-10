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
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  specialists = new BehaviorSubject<Specialist[]>([]);
  goods = new BehaviorSubject<Good[]>([]);
  seances = new BehaviorSubject<Seance[]>([]);
  workdays = new BehaviorSubject<number[]>([]);

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
  // SPECIALIST
  ///

  getSpecialists() {
    this.get(environment.host + '/specialist/all')
      .pipe(
        map(
          (data: any[]) => {
            return data.map(s => {
              return new Specialist(s.id, s.name, s.description, s.user_id);
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
            return new Specialist(s.id, s.name, s.description, s.user_id);
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

  deleteSpecialist() {

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
    this.get(environment.host + '/seance/all', '&specialistId=' + specialistId + '&date=' + date)
      .pipe(
        map(
          (data: any[]) => data.map(s => new Seance(s.id, s.date, s.time, s.duration, s.price, s.seance_status, s.good_id))
        )
      )
      .subscribe(
        (data: Seance[]) => this.seances.next(data)
      );
  }

  getSeance(id) {
    return this.get(environment.host + '/seance/one', '&id=' + id)
      .pipe(
        map(
          (s: any) => new Seance(s.id, s.date, s.time, s.duration, s.price, s.seance_status, s.good_id)
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
