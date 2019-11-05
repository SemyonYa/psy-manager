import { Component, OnInit } from '@angular/core';
import { Good } from 'src/app/_models/good';
import { DataService } from 'src/app/_services/data.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GoodViewModalComponent } from '../good-view-modal/good-view-modal.component';

@Component({
  selector: 'app-good-list',
  templateUrl: './good-list.component.html',
  styleUrls: ['./good-list.component.scss'],
})
export class GoodListComponent implements OnInit {
  goods = new BehaviorSubject<Good[]>([]);
  specialistId: number;
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private modalController: ModalController) { }

  ngOnInit() {
    this.specialistId = this.activatedRoute.snapshot.parent.params.id;
    this.dataService.getGoods(this.specialistId);
    this.goods = this.dataService.goods;
  }

  async view(id) {
    const modal = await this.modalController.create({
      component: GoodViewModalComponent,
      componentProps: {
        id
      }
    });
    return await modal.present();
  }
}
