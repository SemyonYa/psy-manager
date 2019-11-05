import { Component, OnInit, Input } from '@angular/core';
import { Good } from 'src/app/_models/good';
import { DataService } from 'src/app/_services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-good-view-modal',
  templateUrl: './good-view-modal.component.html',
  styleUrls: ['./good-view-modal.component.scss'],
})
export class GoodViewModalComponent implements OnInit {
  @Input() id: number;
  good: Good;
  constructor(private dataService: DataService, private modalController: ModalController) { }

  ngOnInit() {
    this.dataService.getGood(this.id)
      .subscribe(
        (g: Good) => this.good = g
      );
  }

  close() {
    this.modalController.dismiss();
  }

}
