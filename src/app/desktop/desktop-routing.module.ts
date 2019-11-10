import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopPage } from './desktop.page';
import { DesktopSpecialistsComponent } from './children/desktop-specialists/desktop-specialists.component';
import { DesktopSpecialistComponent } from './children/desktop-specialist/desktop-specialist.component';
import { AuthGuard } from '../_guards/auth.guard';


const desktopRoutes: Routes = [
  {
    path: 'desktop',
    component: DesktopPage,
    children: [
      { path: '', component: DesktopSpecialistsComponent, pathMatch: 'full' },
      { path: ':specId', component: DesktopSpecialistComponent },
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(desktopRoutes)
  ],
  exports: [RouterModule]
})
export class DesktopRoutingModule { }
