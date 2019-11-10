import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.page.html',
  styleUrls: ['./specialist.page.scss'],
})
export class SpecialistPage implements OnInit {
  // organization = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.organization = this.authService.getOrganizationName();
  }

}
