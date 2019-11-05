import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Specialist } from 'src/app/_models/specialist';

@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.scss'],
})
export class GoodComponent implements OnInit {
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
