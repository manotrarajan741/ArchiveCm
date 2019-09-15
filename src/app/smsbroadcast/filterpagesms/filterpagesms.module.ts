import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FilterpagesmsPage } from './filterpagesms.page';

const routes: Routes = [
  {
    path: '',
    component: FilterpagesmsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FilterpagesmsPage]
})
export class FilterpagesmsPageModule {}
