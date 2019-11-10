import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DesktopPage } from './desktop.page';
import { DesktopRoutingModule } from './desktop-routing.module';
import { DesktopSpecialistsComponent } from './children/desktop-specialists/desktop-specialists.component';
import { DesktopSpecialistComponent } from './children/desktop-specialist/desktop-specialist.component';
import { DesktopSeanceModalComponent } from './children/desktop-seance-modal/desktop-seance-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesktopRoutingModule
  ],
  declarations: [
    DesktopPage,
    DesktopSpecialistsComponent,
    DesktopSpecialistComponent,
    DesktopSeanceModalComponent
  ],
  entryComponents: [
    DesktopSeanceModalComponent
  ]
})
export class DesktopPageModule { }
