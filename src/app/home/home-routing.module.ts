import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { Routes, RouterModule } from '@angular/router';
import { SpecsComponent } from './children/specs/specs.component';
import { GoodsComponent } from './children/goods/goods.component';

const homeRoutes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      { path: 'specs', component: SpecsComponent },
      { path: 'goods', component: GoodsComponent },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule { }
