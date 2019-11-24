import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Seance } from 'src/app/_models/seance';
import { ModalController, AlertController } from '@ionic/angular';
import { ScheduleCreateModalComponent } from '../schedule-create/schedule-create-modal.component';
import { ScheduleEditComponent } from '../schedule-edit/schedule-edit.component';
import { ScheduleShareModalComponent } from '../schedule-share-modal/schedule-share-modal.component';
import { ScheduleCopyModalComponent } from '../schedule-copy-modal/schedule-copy-modal.component';
import { HelpMe } from 'src/app/_models/help-me';
import { Good } from 'src/app/_models/good';
import { FiveMinutes } from 'src/app/_models/five-minutes';
import { Specialist } from 'src/app/_models/specialist';

@Component({
  selector: 'app-schedule-date',
  templateUrl: './schedule-date.component.html',
  styleUrls: ['./schedule-date.component.scss'],
})
export class ScheduleDateComponent implements OnInit {
  monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];
  id: number;
  specialist: Observable<Specialist>;
  date: Date;
  fms: FiveMinutes[] = [];
  seances: Seance[] = [];
  goods: Good[];
  minDate: Date = new Date((new Date()).getFullYear() - 1, 0, 1);
  maxDate: Date = new Date((new Date()).getFullYear() + 1, 11, 31);
  // maxDateString = HelpMe.dateToString();


  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, public modalController: ModalController, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.parent.params.id;
    const dateString = this.activatedRoute.snapshot.params.date;
    this.date = new Date(dateString);
    if (this.date > this.maxDate || this.date < this.minDate) {
      this.date = new Date();
    }
    this.specialist = this.dataService.getSpecialist(this.id);
    this.fillFms();
    this.fillSeances();
  }

  fillFms() {
    for (let i = 1; i <= 288; i++) {
      this.fms.push(
        new FiveMinutes(i, Math.floor((i - 1) / 12), (i - 1) * 5 % 60, 0, '', false, false)
      );
    }
  }

  fillSeances() {
    this.dataService.getSeances(this.id, HelpMe.dateToString(this.date))
      .subscribe(
        (data: Seance[]) => {
          this.seances = data;
        }
      );
  }

  openTime(seanceId, hour, minutes) {
    if (seanceId) {
      this.edit(seanceId);
    } else {
      this.create(hour, minutes);
    }
  }

  async create(hour, minutes) {
    const time = HelpMe.stringTimeFromParams(hour, minutes);
    const modal = await this.modalController.create({
      component: ScheduleCreateModalComponent,
      componentProps: {
        specialistId: this.id,
        date: this.date,
        time
      }
    });
    return await modal.present();
  }

  async edit(id) {
    const modal = await this.modalController.create({
      component: ScheduleEditComponent,
      componentProps: {
        specialistId: this.id,
        date: this.date,
        id
      },
      cssClass: 'edit-modal'
    });
    return await modal.present();
  }

  async copyFromDate() {
    const modal = await this.modalController.create({
      component: ScheduleCopyModalComponent,
      componentProps: {
        specialistId: this.id,
        date: this.date,
      }
    });
    return await modal.present();
  }

  async shareByWeekday() {
    const modal = await this.modalController.create({
      component: ScheduleShareModalComponent,
      componentProps: {
        specialistId: this.id,
        date: this.date,
      },
      cssClass: 'edit-modal'
    });
    return await modal.present();
  }

  clearDateFn() {
    this.dataService.clearDate(this.id, HelpMe.dateToString(this.date))
      .subscribe(
        (resp) => {
          if (resp === true) {
            this.dataService.getSeances(this.id, HelpMe.dateToString(this.date));
            this.dataService.getWorkdays(this.id, this.date.getFullYear(), this.date.getMonth() * 1 + 1 * 1);
          }
        }
      );
  }

  async clearDate() {
    const alert = await this.alertController.create({
      header: 'Предупреждение',
      message: 'Всё расписание текущего дня будет очищено. Продолжить?',
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ок',
          handler: this.clearDateFn.bind(this)
        }
      ]
    });

    await alert.present();
  }
}
