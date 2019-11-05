import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../_models/i-menu-item';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  menu: Set<IMenuItem> = new Set<IMenuItem>();
  token: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.menu
      .add({ link: '/home/specs', title: 'Специалисты' })
      .add({ link: '/home/goods', title: 'Услуги' });

    // this.router.routerState;
    console.log('router', this.router);
    console.log('activated', this.activatedRoute);
    console.log(JSON.parse(localStorage.getItem('AdministratorTokenKey')));
  }



}
