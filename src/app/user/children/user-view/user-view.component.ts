import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  user: User;
  userId: number;
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.dataService.getUser(this.userId)
      .subscribe(
        (u: User) => {
          console.log('u', u);
          this.user = u;
        }
      );
  }


}
