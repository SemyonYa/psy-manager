import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../_services/data.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { UserData } from '../_models/user-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: FormGroup;
  constructor(private dataService: DataService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.authData.value) {
      this.router.navigate(['/desktop']);
    }
    this.form = new FormGroup({
      app: new FormControl('manager,spec'),
      login: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });
  }

  login() {
    if (this.form.valid) {
      this.dataService.login(this.form.value)
        .subscribe(
          (answer) => {
            console.log('login', answer);
            if (answer !== false) {
              // const userData = new UserData();
              this.authService.login(answer as UserData);
              this.router.navigate(['/desktop']);
            } else {
              this.form.reset();
            }
          }
        );
    }
  }
}
