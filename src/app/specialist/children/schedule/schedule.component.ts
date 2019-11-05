import { Component, OnInit } from '@angular/core';
import { Specialist } from 'src/app/_models/specialist';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  specialist: Specialist;
  
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const specialistId = this.activatedRoute.snapshot.params.id;
    this.dataService.getSpecialist(specialistId)
      .subscribe(
        (s: Specialist) => {
          this.specialist = s;
        }
      );
  }
}
