import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Specialist } from 'src/app/_models/specialist';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  specialists = new BehaviorSubject<Specialist[]>([]);

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.specialists = this.dataService.specialists;
    this.dataService.getSpecialists();
   }

}
