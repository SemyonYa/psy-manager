import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Seance } from 'src/app/_models/seance';
import { Good } from 'src/app/_models/good';
import { DataService } from 'src/app/_services/data.service';
import { Observable, of } from 'rxjs';
import { HelpMe } from 'src/app/_models/help-me';

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create-modal.component.html',
  styleUrls: ['./schedule-create-modal.component.scss'],
})
export class ScheduleCreateModalComponent implements OnInit {
  @Input() specialistId: number;
  @Input() date: Date;
  @Input() time: string;
  dateString: string;
  currentDuration = 0;
  form: FormGroup;
  goods: Good[] = [];
  constructor(private dataService: DataService, private modalController: ModalController) { }

  ngOnInit() {
    // this.dateString = this.date.toDateString();
    this.dateString = HelpMe.dateToString(this.date);
    this.dataService.getGoods(this.specialistId);
    this.dataService.goods
      .subscribe(
        (data: Good[]) => {
          this.goods = data;
          this.form = Seance.createForm(this.specialistId, this.date, this.time, this.checkForm.bind(this));
          this.currentDuration = this.form.value.duration;
        }
      );
  }

  close() {
    this.modalController.dismiss();
  }

  submit() {
    console.log('submit', this.form);
    this.dataService.newSeance(this.form.value)
      .subscribe(
        (resp) => {
          if (resp != false) {
            this.dataService.getSeances(this.specialistId, this.dateString);
            this.dataService.getWorkdays(this.specialistId, this.date.getFullYear(), this.date.getMonth() * 1 + 1 * 1);
            this.close();
          }
        }
      );
  }

  changeGood() {
    const selectedGood = this.goods.find(g => g.id == this.form.value.goodId);
    this.form.get('duration').setValue(selectedGood.duration);
    this.form.get('price').setValue(selectedGood.price);
  }

  checkForm(formGroup: FormGroup): Observable<any> {
    if (this.form) {
      // tslint:disable-next-line:max-line-length
      return this.dataService.checkSeanceCreate(this.specialistId, formGroup.get('time').value, formGroup.get('duration').value, this.dateString);
    } else {
      return of(null);
    }
  }

}
