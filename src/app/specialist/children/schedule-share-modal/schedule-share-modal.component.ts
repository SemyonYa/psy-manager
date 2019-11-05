import { Component, OnInit, Input } from '@angular/core';
import { HelpMe } from 'src/app/_models/help-me';
import { DataService } from 'src/app/_services/data.service';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Seance } from 'src/app/_models/seance';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-schedule-share-modal',
  templateUrl: './schedule-share-modal.component.html',
  styleUrls: ['./schedule-share-modal.component.scss'],
})
export class ScheduleShareModalComponent implements OnInit {
  form: FormGroup;
  @Input() specialistId: number;
  @Input() date: Date;
  minDate: string;
  maxDate: string;
  success = false;
  constructor(private dataService: DataService, private modalController: ModalController) { }

  ngOnInit() {
    this.minDate = HelpMe.dateToString(this.date);
    this.maxDate = HelpMe.stringDateFormParams(this.date.getFullYear() + 1, 12, 31);
    this.form = Seance.shareForm(this.specialistId, HelpMe.dateToString(this.date), this.checkDates);
  }

  submit() {
    console.log('share', this.form);
    this.dataService.shareByWeekday(this.form.value)
      .subscribe(
        (resp) => {
          console.log(resp);
          if (resp === true) {
            this.success = true;
            this.dataService.getWorkdays(this.specialistId, this.date.getFullYear(), this.date.getMonth() * 1 + 1 * 1);
            setTimeout(() => {
              this.close();
            }, 3000);
          }
        }
      );
  }

  close() {
    this.modalController.dismiss();
  }

  checkDates(formGroup: FormGroup) {
    const start = new Date(formGroup.get('start').value);
    const end = new Date(formGroup.get('end').value);
    console.log('form', formGroup);
    if (start > end) {
      return {
        startMoreEnd: true
      };
    }
    return null;
  }

}
