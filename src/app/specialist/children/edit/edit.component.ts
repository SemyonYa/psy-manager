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
  id: number;
  // tslint:disable-next-line:max-line-length
  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.dataService.getSpecialist(this.id)
      .subscribe(
        (s: Specialist) => {
          this.form = s.editForm(this.checkName.bind(this));
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

  checkName(nameControl: FormControl): Observable<any> {
    return this.dataService.checkSpecialistEditName(this.id ,nameControl.value);
  }
}
