import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, AsyncValidatorFn, FormControl } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { Specialist } from 'src/app/_models/specialist';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  form: FormGroup;
  specialists: Specialist[] = [];
  constructor(private dataService: DataService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const parent = this.authService.getUserId();
    this.dataService.getSpecialists();

    this.dataService.specialists
      .subscribe(
        (data: Specialist[]) => {
          this.specialists = data;
          this.form = User.createForm(this.validateLogin.bind(this));
        }
      );
  }

  submit() {
    console.log(this.form.value);
    this.dataService.createUser(this.form.value)
      .subscribe(
        (resp) => {
          if (resp !== false) {
            this.dataService.getUsers();
            this.router.navigateByUrl('/user');
          }
        }
      );
  }

  validateLogin(control: FormControl): Observable<any> {
    return this.dataService.validateCreateUserLogin(control.value, 0);
  }

}
