import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { Observable } from 'rxjs';
import { Seance } from 'src/app/_models/seance';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-desktop-seance-modal',
  templateUrl: './desktop-seance-modal.component.html',
  styleUrls: ['./desktop-seance-modal.component.scss'],
})
export class DesktopSeanceModalComponent implements OnInit {
  @Input() id: number;
  seance: Observable<Seance>;
  constructor(private dataServise: DataService, private modalController: ModalController) { }

  ngOnInit() {
    this.seance = this.dataServise.getSeance(this.id);
    console.log(this.seance);
  }

  close() {
    this.modalController.dismiss();
  }

  toScheduled() {
    alert('to scheduled');
  }

  toAborted() {
    alert('to aborted');
  }

  toFinished() {
    alert('to finished');
  }
}
