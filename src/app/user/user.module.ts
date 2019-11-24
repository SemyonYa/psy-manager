import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPage } from './user.page';
import { UserCreateComponent } from './children/user-create/user-create.component';
import { UserListComponent } from './children/user-list/user-list.component';
import { UserEditComponent } from './children/user-edit/user-edit.component';
import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from './children/user-view/user-view.component';
import { ResetChildPasswordComponent } from './children/reset-child-password/reset-child-password.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    UserRoutingModule
  ],
  declarations: [
    UserPage,
    UserViewComponent,
    UserCreateComponent,
    UserListComponent,
    UserEditComponent,
    ResetChildPasswordComponent
  ],
  entryComponents: [
    ResetChildPasswordComponent
  ]
})
export class UserPageModule {}
