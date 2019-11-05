import { Component, OnInit, Input } from '@angular/core';
import { Specialist } from 'src/app/_models/specialist';
import { DataService } from 'src/app/_services/data.service';
import { Good } from 'src/app/_models/good';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-good-clone',
  templateUrl: './good-clone.component.html',
  styleUrls: ['./good-clone.component.scss'],
})
export class GoodCloneComponent implements OnInit {
  specialistId: number;
  specialists: Specialist[] = [];
  goods: Good[] = [];
  currentSpecialistId = 0;
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.specialistId = this.activatedRoute.snapshot.parent.params.id;
    this.dataService.getSpecialists();
    this.dataService.specialists
      .subscribe(
        (data: Specialist[]) => this.specialists = data
      );
  }

  selectSpecialist(id: string) {
    this.currentSpecialistId = Number.parseInt(id, 10);
    this.dataService.getGoods(this.currentSpecialistId);
    this.dataService.goods
      .subscribe(
        (data: Good[]) => this.goods = data
      );
  }

  selectGood(id) {
    this.dataService.cloneGood(id, this.specialistId)
      .subscribe(
        (resp) => {
          if (resp != false) {
            this.dataService.getGoods(this.specialistId);
            this.router.navigateByUrl('/specialist/' + this.specialistId + '/good');
          } else {
            alert('Imposible!');
          }
        }
      );
  }
}
