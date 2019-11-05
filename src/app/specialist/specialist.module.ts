import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialistPage } from './specialist.page';
import { SpecialistRoutingModule } from './specialist-routing.module';
import { ListComponent } from './children/list/list.component';
import { GoodComponent } from './children/good/good.component';
import { CreateComponent } from './children/create/create.component';
import { EditComponent } from './children/edit/edit.component';
import { GoodListComponent } from './children/good-list/good-list.component';
import { GoodCreateComponent } from './children/good-create/good-create.component';
import { GoodEditComponent } from './children/good-edit/good-edit.component';
import { GoodViewModalComponent } from './children/good-view-modal/good-view-modal.component';
import { GoodCloneComponent } from './children/good-clone/good-clone.component';
import { ScheduleComponent } from './children/schedule/schedule.component';
import { ScheduleMonthComponent } from './children/schedule-month/schedule-month.component';
import { ScheduleDateComponent } from './children/schedule-date/schedule-date.component';
import { ScheduleCreateModalComponent } from './children/schedule-create/schedule-create-modal.component';
import { ScheduleEditComponent } from './children/schedule-edit/schedule-edit.component';
import { ScheduleCopyModalComponent } from './children/schedule-copy-modal/schedule-copy-modal.component';
import { ScheduleShareModalComponent } from './children/schedule-share-modal/schedule-share-modal.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SpecialistRoutingModule
  ],
  declarations: [
    SpecialistPage,
    ListComponent,
    GoodComponent,
    CreateComponent,
    EditComponent,
    GoodListComponent,
    GoodCreateComponent,
    GoodEditComponent,
    GoodViewModalComponent,
    GoodCloneComponent,
    ScheduleComponent,
    ScheduleMonthComponent,
    ScheduleDateComponent,
    ScheduleCreateModalComponent,
    ScheduleEditComponent,
    ScheduleCopyModalComponent,
    ScheduleShareModalComponent
  ],
  entryComponents: [
    GoodViewModalComponent,
    ScheduleCreateModalComponent,
    ScheduleEditComponent,
    ScheduleCopyModalComponent,
    ScheduleShareModalComponent
  ]
})
export class SpecialistPageModule {}
