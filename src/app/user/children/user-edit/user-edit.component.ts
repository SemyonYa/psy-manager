import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  userId: number;
  user: User;
  form: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.dataService.getUser(this.userId)
      .subscribe(
        (u: User) => {
          this.user = u;
          console.log(u);
          this.form = this.user.editForm(this.validateLogin.bind(this));
        }
      );
  }

  submit() {
    console.log(this.form);
    this.dataService.editUser(this.form.value)
      .subscribe(
        (resp) => {
          if (resp !== false) {
            this.dataService.getUsers();
            this.router.navigateByUrl('/user');
          }
        }
      );
  }

  async delete() {
    const alert = await this.alertController.create({
      header: 'Удалеине!',
      message: 'Действительно удалить пользователя <strong>' + this.user.login + '</strong>?',
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
        },
        {
          text: 'Да',
          handler: () => {
            this.dataService.deleteUser(this.userId)
              .subscribe(
                (resp) => {
                  if (resp !== false) {
                    this.dataService.getUsers();
                    this.router.navigateByUrl('/user');
                  }
                }
              );
          }
        }
      ]
    });
    await alert.present();
  }

  validateLogin(control: FormControl): Observable<any> {
    return this.dataService.validateCreateUserLogin(control.value, this.userId);
  }
}
