import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { BehaviorSubject } from 'rxjs';
import { Seance } from 'src/app/_models/seance';
import { ModalController, AlertController } from '@ionic/angular';
import { ScheduleCreateModalComponent } from '../schedule-create/schedule-create-modal.component';
import { ScheduleEditComponent } from '../schedule-edit/schedule-edit.component';
import { ScheduleShareModalComponent } from '../schedule-share-modal/schedule-share-modal.component';
import { ScheduleCopyModalComponent } from '../schedule-copy-modal/schedule-copy-modal.component';
import { HelpMe } from 'src/app/_models/help-me';
import { Good } from 'src/app/_models/good';

@Component({
  selector: 'app-schedule-date',
  templateUrl: './schedule-date.component.html',
  styleUrls: ['./schedule-date.component.scss'],
})
export class ScheduleDateComponent implements OnInit {
  date: Date;
  specialistId: number;
  fiveMinutes: {
    n: number,
    hour: number,
    minutes: number,
    seance: number,
    good: string,
    isStart: boolean,
    isEnd: boolean
  }[] = [];
  goods: Good[];
  seances: Seance[] = [];
  minDate: Date;
  maxDate: Date;


  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, public modalController: ModalController, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    const dateString = this.activatedRoute.snapshot.params.date;
    this.date = new Date(dateString);
    this.specialistId = this.activatedRoute.snapshot.parent.params.id;
    this.minDate = new Date(this.date.getFullYear(), this.date.getMonth() * 1 + 1, 1, 0, 0, 0, 0);
    this.maxDate = new Date(this.date.getFullYear() * 1 + 1, 12, 31, 23, 59, 59, 0);
    // if (this.date < this.minDate || this.date > this.maxDate) {
    //   this.date = new Date();
    //   this.router.navigateByUrl('/specialist/' + this.specialistId + '/schedule');
    // }
    this.dataService.getSeances(this.specialistId, dateString); // HelpMe.dateToString(this.date));
    this.dataService.getGoods(this.specialistId);
    this.dataService.goods
      .subscribe(
        (data: Good[]) => {
          this.goods = data;
          this.dataService.seances
            .subscribe(
              (data2: Seance[]) => {
                this.fillFiveMinutes();
                this.seances = data2;
                for (const seance of data2) {
                  const start = (seance.time.hours * 60 + seance.time.minutes) / 5;
                  const end = start + seance.duration / 5;
                  const id = seance.id;
                  for (let i = start; i < end; i++) {
                    this.fiveMinutes[i].seance = id;
                    this.fiveMinutes[i].isStart = (i === start);
                    this.fiveMinutes[i].isEnd = (i === (end - 1));
                    this.fiveMinutes[i].good = this.goods.find(g => g.id == seance.goodId).name;
                  }
                }
              }
            );
        }
      );
  }

  private fillFiveMinutes() {
    this.fiveMinutes = [];
    for (let i = 1; i <= 288; i++) {
      this.fiveMinutes.push({
        n: i,
        hour: Math.floor((i - 1) / 12),
        minutes: (i - 1) * 5 % 60,
        seance: 0,
        isStart: false,
        isEnd: false,
        good: ''
      });
    }
  }

  openTime(seanceId, hour, minutes) {
    if (seanceId) {
      this.edit(seanceId);
    } else {
      this.create(HelpMe.stringTimeFromParams(hour, minutes));
    }
  }

  async create(time) {
    const modal = await this.modalController.create({
      component: ScheduleCreateModalComponent,
      componentProps: {
        specialistId: this.specialistId,
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
        specialistId: this.specialistId,
        date: this.date,
        id
      }
    });
    return await modal.present();
  }

  async copyFromDate() {
    const modal = await this.modalController.create({
      component: ScheduleCopyModalComponent,
      componentProps: {
        specialistId: this.specialistId,
        date: this.date,
      }
    });
    return await modal.present();
  }

  async shareByWeekday() {
    const modal = await this.modalController.create({
      component: ScheduleShareModalComponent,
      componentProps: {
        specialistId: this.specialistId,
        date: this.date,
      }
    });
    return await modal.present();
  }

   clearDateFn() {
    this.dataService.clearDate(this.specialistId, HelpMe.dateToString(this.date))
      .subscribe(
        (resp) => {
          if (resp === true) {
            this.dataService.getSeances(this.specialistId, HelpMe.dateToString(this.date));
            this.dataService.getWorkdays(this.specialistId, this.date.getFullYear(), this.date.getMonth() * 1 + 1 * 1);
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
