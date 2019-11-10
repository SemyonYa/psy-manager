import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../_models/i-menu-item';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-desktop',
  templateUrl: 'desktop.page.html',
  styleUrls: ['desktop.page.scss'],
})
export class DesktopPage implements OnInit {
  menu: Set<IMenuItem> = new Set<IMenuItem>();
  token: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    console.log('router', this.router);
    console.log('activated', this.activatedRoute);
    console.log(JSON.parse(localStorage.getItem('AdministratorTokenKey')));
  }



}
