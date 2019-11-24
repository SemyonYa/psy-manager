import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { HelpMe } from 'src/app/_models/help-me';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-schedule-month',
  templateUrl: './schedule-month.component.html',
  styleUrls: ['./schedule-month.component.scss'],
})
export class ScheduleMonthComponent implements OnInit {
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
  monthNo = 0;
  month: { y: number, n: number, name: string, lastDay: number };
  beginSpaces = [];
  finalSpaces = [];
  dates: { n: number, isBusy: boolean, isToday: boolean }[] = [];
  workdays = [];
  specialistId: number;
  maxMonth: number;
  previousIsVisible = true;
  nextIsVisible = true;
  currentDate: Date;
  currentDateString: string;
  minDate: string;
  maxDate: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.monthNo = 0;
    this.specialistId = this.activatedRoute.snapshot.parent.params.id;
    this.currentDate = new Date();
    this.maxMonth = 12 * 2 - this.currentDate.getMonth() - 1;
    this.currentDateString = HelpMe.dateToString(new Date());
    this.minDate = HelpMe.stringDateFormParams(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    this.maxDate = HelpMe.stringDateFormParams(this.currentDate.getFullYear() + 1, 12, 31);
    this.initMonth();
  }

  initMonth() {
    if (this.monthNo < -1 || this.monthNo > this.maxMonth) {
      this.monthNo = 0;
      this.router.navigateByUrl('/specialist/' + this.specialistId + '/schedule/month');
    }
    this.getMonthData(this.monthNo);
    this.currentDateString = HelpMe.stringDateFormParams(this.month.y, this.month.n, 1);
    // this.workdays = [];
    this.dataService.getWorkdays(this.specialistId, this.month.y, this.month.n);
    this.dataService.workdays
      .subscribe(
        (data: number[]) => {
          this.workdays = data;
          this.dates = [];
          for (let i = 1; i <= this.month.lastDay; i++) {
            this.dates.push({
              n: i,
              isBusy: (this.workdays.indexOf(i) != -1),
              isToday: (i === this.currentDate.getDate() && this.monthNo === 0)
            });
          }
        }
      );
  }

  getMonthData(month: number) {
    // const currentDate = new Date();
    const firstDayDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() * 1 + month * 1, 1, 0, 0, 0, 0);
    const lastDayDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() * 1 + month * 1 + 1, 0, 0, 0, 0, 0);
    const firstDayWeekday = (firstDayDate.getDay() == 0) ? 7 : firstDayDate.getDay();
    const lastDayWeekday = (lastDayDate.getDay() == 0) ? 7 : lastDayDate.getDay();
    const lastDay = lastDayDate.getDate();
    this.month = {
      y: firstDayDate.getFullYear(),
      n: firstDayDate.getMonth() * 1 + 1 * 1,
      name: this.monthNames[firstDayDate.getMonth()],
      lastDay
    };
    this.beginSpaces = [];
    for (let i = 1; i < firstDayWeekday; i++) {
      this.beginSpaces.push(0);
    }
    this.finalSpaces = [];
    for (let i = 1; i <= 7 - lastDayWeekday; i++) {
      this.finalSpaces.push(0);
    }
  }

  openDate(day: string) {
    console.log('day', day);
    const dayString = (day.toString().length === 1) ? '0' + day : day;
    const monthString = (this.month.n.toString().length === 1) ? '0' + this.month.n : this.month.n;
    // const specialistId = this.activatedRoute.snapshot.parent.params.id;
    console.log(this.specialistId);
    // tslint:disable-next-line:max-line-length
    this.router.navigateByUrl('/specialist/' + this.specialistId + '/schedule/date/' + HelpMe.stringDateFormParams(this.month.y, this.month.n, day)); // this.month.y + '.' + monthString + '.' + dayString);
  }

  previous() {
    this.monthNo--;
    this.initMonth();
    this.previousIsVisible = !(this.monthNo === -1);
    this.nextIsVisible = !(this.monthNo === this.maxMonth);
    console.log(this.monthNo);
    console.log(this.monthNo !== -1);
  }

  next() {
    this.monthNo++;
    this.initMonth();
    this.previousIsVisible = !(this.monthNo === -1);
    this.nextIsVisible = !(this.monthNo === this.maxMonth);
  }

  changeMonth(dateNode: IonDatetime) {
    this.currentDateString = dateNode.value.split('T')[0];
    const dateR = this.currentDateString.split('-');
    // tslint:disable-next-line:max-line-length
    this.monthNo = (Number.parseInt(dateR[0], 10) - this.currentDate.getFullYear()) * 12 + Number.parseInt(dateR[1], 10) - this.currentDate.getMonth() - 1;
    console.log(this.monthNo);
    this.initMonth();
    this.previousIsVisible = !(this.monthNo === -1);
    this.nextIsVisible = !(this.monthNo === this.maxMonth);
    console.log('month', dateR);
  }
}
