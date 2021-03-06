import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { Specialist } from 'src/app/_models/specialist';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HelpMe } from 'src/app/_models/help-me';
import { IonDatetime, ModalController } from '@ionic/angular';
import { FiveMinutes } from 'src/app/_models/five-minutes';
import { Seance } from 'src/app/_models/seance';
import { DesktopSeanceModalComponent } from '../desktop-seance-modal/desktop-seance-modal.component';

@Component({
  selector: 'app-desktop-specialist',
  templateUrl: './desktop-specialist.component.html',
  styleUrls: ['./desktop-specialist.component.scss'],
})
export class DesktopSpecialistComponent implements OnInit {
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
  date = new Date();
  // maxDate: Date = new Date((new Date()).getFullYear() + 1, 11, 31);
  minDateString = HelpMe.stringDateFormParams((new Date()).getFullYear() - 1, 1, 1);
  maxDateString = HelpMe.stringDateFormParams((new Date()).getFullYear() + 1, 12, 31);
  fms: FiveMinutes[] = [];
  isWeekView = false;
  seances: Seance[] = [];
  weekSeances: { date: Date, seances: Observable<Seance[]> }[] = [
    { date: new Date(), seances: of([]) },
    { date: new Date(), seances: of([]) },
    { date: new Date(), seances: of([]) },
    { date: new Date(), seances: of([]) },
    { date: new Date(), seances: of([]) },
    { date: new Date(), seances: of([]) },
    { date: new Date(), seances: of([]) }
  ];
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private modalController: ModalController) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.specId;
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
    if (this.isWeekView) {
      this.getWeekSeances();
    } else {
      this.getSeances();
    }
  }

  getSeances() {
    this.dataService.getSeances(this.id, HelpMe.dateToString(this.date))
      .subscribe(
        (data: Seance[]) => {
          this.seances = data;
        }
      );
  }

  getWeekSeances() {
    for (let i = 0; i <= 6; i++) {
      const currentDate = new Date(this.date);
      currentDate.setDate(this.date.getDate() + i);
      this.weekSeances[i] = { date: currentDate, seances: this.dataService.getSeances(this.id, HelpMe.dateToString(currentDate))};
    }
  }

  selectDate(dateNode: IonDatetime) {
    this.date = new Date(dateNode.value.split('T')[0]);
    this.fillSeances();
  }

  changeView(event) {
    this.isWeekView = event.target.value === 'week';
    this.fillSeances();
  }

  updatePage() {
    this.fillSeances();
  }

  async openSeance(id) {
    const modal = await this.modalController.create({
      component: DesktopSeanceModalComponent,
      componentProps: { id }
    });
    return await modal.present();
  }
}
