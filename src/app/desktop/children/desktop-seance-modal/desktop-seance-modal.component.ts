import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { Observable } from 'rxjs';
import { Seance } from 'src/app/_models/seance';

@Component({
  selector: 'app-desktop-seance-modal',
  templateUrl: './desktop-seance-modal.component.html',
  styleUrls: ['./desktop-seance-modal.component.scss'],
})
export class DesktopSeanceModalComponent implements OnInit {
  @Input() id: number;
  seance: Observable<Seance>;
  constructor(private dataServise: DataService) { }

  ngOnInit() {
    this.seance = this.dataServise.getSeance(this.id);
  }

}
