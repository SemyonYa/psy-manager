import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Good } from '../models/good';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getGoods() {
    this.http.get(environment.host + '/good/all')
      .pipe(map(
        data => {
          const goods = data as any[];
          return goods.map(g => new Good());
        }
      ));
  }
}
