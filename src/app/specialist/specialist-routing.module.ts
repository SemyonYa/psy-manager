import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SpecialistPage } from './specialist.page';
import { GoodComponent } from './children/good/good.component';
import { ListComponent } from './children/list/list.component';
import { CreateComponent } from './children/create/create.component';
import { EditComponent } from './children/edit/edit.component';
import { GoodListComponent } from './children/good-list/good-list.component';
import { GoodCreateComponent } from './children/good-create/good-create.component';
import { GoodEditComponent } from './children/good-edit/good-edit.component';
import { ScheduleComponent } from './children/schedule/schedule.component';
import { ScheduleMonthComponent } from './children/schedule-month/schedule-month.component';
import { ScheduleDateComponent } from './children/schedule-date/schedule-date.component';
import { AuthGuard } from '../_guards/auth.guard';
import { GoodCloneComponent } from './children/good-clone/good-clone.component';

const goodRoutes: Routes = [
  { path: '', component: GoodListComponent },
  { path: 'create', component: GoodCreateComponent },
  { path: 'clone', component: GoodCloneComponent },
  { path: 'edit/:goodId', component: GoodEditComponent },

];

const scheduleRoutes: Routes = [
  { path: 'month', component: ScheduleMonthComponent },
  { path: 'date/:date', component: ScheduleDateComponent },
  { path: '', redirectTo: 'month', pathMatch: 'full' },

];

const specialistRoutes: Routes = [
  {
    path: 'specialist',
    component: SpecialistPage,
    children: [
      { path: ':id/good', component: GoodComponent, children: goodRoutes },
      { path: ':id/schedule', component: ScheduleComponent, children: scheduleRoutes },
      { path: 'create', component: CreateComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: '', component: ListComponent },
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(specialistRoutes)
  ],
  exports: [RouterModule]
})
export class SpecialistRoutingModule { }
