import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { UserPage } from './user.page';
import { UserViewComponent } from './children/user-view/user-view.component';
import { UserListComponent } from './children/user-list/user-list.component';
import { UserEditComponent } from './children/user-edit/user-edit.component';
import { UserCreateComponent } from './children/user-create/user-create.component';
import { ManagerRoleGuard } from '../_guards/manager-role.guard';


const userRoutes: Routes = [
  {
    path: 'user',
    component: UserPage,
    children: [
      { path: '', component: UserListComponent, pathMatch: 'full' },
      { path: ':userId/edit', component: UserEditComponent },
      { path: 'create', component: UserCreateComponent },
      { path: ':userId', component: UserViewComponent },
    ],
    canActivate: [AuthGuard, ManagerRoleGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
