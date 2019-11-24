import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Specialist } from 'src/app/_models/specialist';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  form: FormGroup;
  photoFile: File = null;
  id: number;
  specialist: Specialist;
  // tslint:disable-next-line:max-line-length
  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.dataService.getSpecialist(this.id)
      .subscribe(
        (s: Specialist) => {
          this.specialist = s;
          this.form = s.editForm(this.checkName.bind(this));
        }
      );
  }

  loadPhoto(event) {
    this.photoFile = event.target.files[0];
    const fd = new FormData();
    fd.append('img', this.photoFile, this.photoFile.name);
    fd.append('id', this.id.toString());
    this.dataService.loadSpecialistPhoto(fd)
      .subscribe(
        (resp) => {
          if (resp === false) {
            this.rejected('Неверный формат файла.');
            setTimeout(() => {
              this.alertController.dismiss();
            }, 2000);
          } else {
            this.dataService.getSpecialist(this.id)
              .subscribe(
                (s: Specialist) => {
                  this.specialist = s;
                }
              );
          }
          console.log('resp', resp);
        }
      );
  }

  submit() {
    this.dataService.updateSpecialist(this.form.value)
      .subscribe(
        (resp) => {
          if (resp != false) {
            this.dataService.getSpecialists();
            this.router.navigateByUrl('/specialist');
          }
        }
      );
  }

  async remove() {
    const alert = await this.alertController.create({
      header: 'Внимание!',
      // tslint:disable-next-line:max-line-length
      message: 'Специалист будет удален без возможности восстановления. Также удалятся его расписание, список услуг и история.<br>Продолжить?',
      buttons: [
        {
          text: 'Отменить',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Удалить',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async rejected(text: string) {
    const alert = await this.alertController.create({
      header: 'Загрузка не удалась',
      message: text,
    });

    await alert.present();
  }

  checkName(nameControl: FormControl): Observable<any> {
    return this.dataService.checkSpecialistEditName(this.id, nameControl.value);
  }

  async delete() {
    const alert = await this.alertController.create({
      header: 'Удалеине!',
      message: 'Действительно удалить специалиста <strong>' + this.specialist.name + '</strong>?',
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
        },
        {
          text: 'Да',
          handler: () => {
            this.dataService.deleteSpecialist(this.id)
              .subscribe(
                (resp) => {
                  if (resp !== false) {
                    this.dataService.getSpecialists();
                    this.router.navigateByUrl('/specialist');
                  }
                }
              );
          }
        }
      ]
    });
    await alert.present();
  }

}
