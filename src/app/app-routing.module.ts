import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ManagerRoleGuard } from './_guards/manager-role.guard';
import { ProfilePage } from './profile/profile.page';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'desktop',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule',

  },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [ AuthGuard, ManagerRoleGuard ]
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
