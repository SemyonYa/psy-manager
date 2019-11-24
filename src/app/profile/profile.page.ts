import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { FormGroup } from '@angular/forms';
import { Profile } from '../_models/profile';
import { AuthService } from '../_services/auth.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';
import { User } from '../_models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  form: FormGroup;
  profile: Profile;
  editable = false;
  success = false;
  impossible = false;
  photoFile: File = null;
  // tslint:disable-next-line:max-line-length
  constructor(private dataService: DataService, private authService: AuthService, private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {
    this.getProfileData();
  }

  getProfileData() {
    const profileId = this.authService.getUserId();
    this.dataService.getProfile(profileId)
      .subscribe(
        (p: Profile) => {
          this.profile = p;
          this.form = p.editForm();
        }
      );
  }

  edit() {
    this.editable = true;
  }

  submit() {
    this.dataService.saveProfile(this.form.value)
      .subscribe(
        (resp) => {
          if (resp === true) {
            this.editable = false;
            this.getProfileData();
            this.success = true;
            setTimeout(() => {
              this.success = false;
            }, 3000);
          } else {
            this.editable = false;
            this.getProfileData();
            this.impossible = true;
            setTimeout(() => {
              this.impossible = false;
            }, 3000);
          }
        }
      );
    console.log('form', this.form);
  }

  async resetPassword() {
    const modal = await this.modalController.create({
      component: ResetPasswordModalComponent,
      componentProps: {
        id: this.authService.getUserId()
      }
    });
    return await modal.present();
  }

  loadLogo(event) {
    this.photoFile = event.target.files[0];
    const fd = new FormData();
    fd.append('img', this.photoFile, this.photoFile.name);
    fd.append('id', this.authService.getUserId().toString());
    this.dataService.loadLogo(fd)
      .subscribe(
        (resp) => {
          if (resp === false) {
            this.rejected('Неверный формат файла.');
            setTimeout(() => {
              this.alertController.dismiss();
            }, 2000);
          } else {
            this.dataService.getProfile(this.authService.getUserId())
              .subscribe(
                (p: Profile) => {
                  this.profile = p;
                }
              );
          }
        }
      );
  }

  async rejected(text: string) {
    const alert = await this.alertController.create({
      header: 'Загрузка не удалась',
      message: text,
    });

    await alert.present();
  }

}
