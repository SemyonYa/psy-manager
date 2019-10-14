import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../models/i-menu-item';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  menu: Set<IMenuItem> = new Set<IMenuItem>();
  constructor() { }
  ngOnInit() {
    this.menu
      .add({link: '/home/specs', title: 'Специалисты'})
      .add({link: '/home/goods', title: 'Услуги'});
  }

}
