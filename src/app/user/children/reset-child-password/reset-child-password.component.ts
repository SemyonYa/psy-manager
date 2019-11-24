import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DataService } from 'src/app/_services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-child-password',
  templateUrl: './reset-child-password.component.html',
  styleUrls: ['./reset-child-password.component.scss'],
})
export class ResetChildPasswordComponent implements OnInit {
  @Input() id: number;
  form: FormGroup;
  constructor(private modalController: ModalController, private dataService: DataService, private alertController: AlertController) { }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(this.id),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    }, this.checkConfirm);
  }

  checkConfirm(formGroup: FormGroup): any {
    const newPassword = formGroup.get('newPassword');
    const confirmPassword = formGroup.get('confirmPassword');
    if (newPassword.dirty && confirmPassword.dirty && newPassword.valid && confirmPassword.valid) {
      console.log(formGroup);
      if (newPassword.value !== confirmPassword.value) {
        return {
          notMatch: true
        };
      }
    }
    return null;
  }

  submit() {
    this.dataService.resetChildPassword(this.form.value)
      .subscribe(
        (resp) => {
          this.modalController.dismiss();
          this.resetResult(resp as boolean);
        }
      );
  }

  async resetResult(res: boolean) {
    const alert = await this.alertController.create({
      header: 'Смена пароля',
      message: (res) ? 'Пароль успешно изменен.' : 'Не удалось изменить пароль.',
      buttons: ['Ok']
    });

    await alert.present();
  }

}
