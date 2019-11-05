import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Seance } from 'src/app/_models/seance';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { Specialist } from 'src/app/_models/specialist';
import { HelpMe } from 'src/app/_models/help-me';

@Component({
  selector: 'app-schedule-copy-modal',
  templateUrl: './schedule-copy-modal.component.html',
  styleUrls: ['./schedule-copy-modal.component.scss'],
})
export class ScheduleCopyModalComponent implements OnInit {
  form: FormGroup;
  @Input() specialistId: number;
  @Input() date: Date;
  specialists: Specialist[] = [];
  constructor(private modalController: ModalController, private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSpecialists();
    this.dataService.specialists
      .subscribe(
        (data: Specialist[]) => {
          this.specialists = data;
          console.log(this.specialistId);
          this.form = Seance.copyForm(this.date, this.specialistId);
        }
      );
  }

  submit() {
    console.log('copy form', this.form.value);
    this.dataService.copyDaySeances(this.form.value)
      .subscribe(
        (resp) => {
          console.log(resp);
          if (resp === true) {
            this.dataService.getSeances(this.specialistId, HelpMe.dateToString(this.date));
            this.modalController.dismiss();
          }
        }
      );
  }

  close() {
    this.modalController.dismiss();
  }

  compareFn(e1: Specialist, e2: Specialist): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }
}
