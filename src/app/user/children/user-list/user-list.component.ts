import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getUsers();
    this.dataService.users
      .subscribe(
        (data: User[]) => {
          this.users = data;
        }
      );
  }

}
