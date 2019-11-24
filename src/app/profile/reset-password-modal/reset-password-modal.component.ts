import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss'],
})
export class ResetPasswordModalComponent implements OnInit {
  @Input() id: number;
  form: FormGroup;
  constructor(private modalController: ModalController, private dataService: DataService, private alertController: AlertController) { }

  ngOnInit() {
    this.form = new FormGroup({
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
    this.dataService.resetPassword(this.form.value)
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
      message: (res) ? 'Пароль успешно изменен. Необходимо войти в систему.' : 'Не удалось изменить пароль.',
      buttons: [
        {
          text: 'Ок',
          cssClass: 'primary',
          handler: () => {
            console.log('Выход');
          }
        }
      ]
    });

    await alert.present();
  }

  close() {
    this.modalController.dismiss();
  }
}
