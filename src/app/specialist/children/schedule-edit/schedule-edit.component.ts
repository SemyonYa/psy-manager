import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Good } from 'src/app/_models/good';
import { DataService } from 'src/app/_services/data.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Seance } from 'src/app/_models/seance';
import { Observable, of } from 'rxjs';
import { HelpMe } from 'src/app/_models/help-me';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.scss'],
})
export class ScheduleEditComponent implements OnInit {
  @Input() id: number;
  @Input() date: Date;
  @Input() specialistId: number;
  dateString: string;
  form: FormGroup;
  goods: Good[] = [];
  currentGoodId: number;
  removeError = false;
  constructor(private dataService: DataService, private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {
    this.dateString = HelpMe.dateToString(this.date);
    this.dataService.getSeance(this.id)
      .subscribe(
        (s: Seance) => {
          this.currentGoodId = s.goodId;
          this.dataService.getGoods(this.specialistId);
          this.dataService.goods
            .subscribe(
              (data: Good[]) => {
                this.goods = data;
                this.form = s.editForm(this.specialistId, this.checkForm.bind(this));
              }
            );
        }
      );
  }

  close() {
    this.removeError = false;
    this.modalController.dismiss();
  }

  submit() {
    console.log('submit', this.form.value);
    const dateString = this.date.getFullYear() + '.' + (this.date.getMonth() * 1 + 1 * 1) + '.' + this.date.getDate();
    this.dataService.updateSeance(this.form.value)
      .subscribe(
        (resp) => {
          if (resp != false) {
            this.dataService.getSeances(this.specialistId, dateString);
            this.dataService.getWorkdays(this.specialistId, this.date.getFullYear(), this.date.getMonth() * 1 + 1 * 1);
            this.close();
          }
        }
      );
  }

  async remove() {
    const alert = await this.alertController.create({
      header: 'Подтверждение!',
      message: 'Действительно удалить сеанс?',
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ок',
          handler: () => {
            this.dataService.deleteSeance(this.id)
              .subscribe(
                (resp) => {
                  if (resp) {
                    this.dataService.getSeances(this.specialistId, HelpMe.dateToString(this.date));
                    this.close();
                  } else {
                    this.removeError = true;
                  }
                }
              );
          }
        }
      ]
    });

    await alert.present();
  }

  changeGood() {
    const selectedGood = this.goods.find(g => g.id == this.form.value.goodId);
    this.form.get('duration').setValue(selectedGood.duration);
    this.form.get('price').setValue(selectedGood.price);
  }

  checkForm(formGroup: FormGroup): Observable<any> {
    const checkDate = new Date(formGroup.get('date').value);
    console.log('check date', checkDate);
    if (this.form) {
      // tslint:disable-next-line:max-line-length
      return this.dataService.checkSeanceEdit(this.specialistId, formGroup.get('time').value, formGroup.get('duration').value, HelpMe.dateToString(checkDate), this.id);
    } else {
      return of(null);
    }
  }

}
