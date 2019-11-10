import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { Specialist } from 'src/app/_models/specialist';

@Component({
  selector: 'app-desktop-specialists',
  templateUrl: './desktop-specialists.component.html',
  styleUrls: ['./desktop-specialists.component.scss'],
})
export class DesktopSpecialistsComponent implements OnInit {
  specialists: Specialist[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSpecialists();
    this.dataService.specialists
      .subscribe(
        (data: Specialist[]) => {
          this.specialists = data;
        }
      );
  }

}
