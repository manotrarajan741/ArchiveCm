import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SmsdetailsPage } from './smsdetails.page';

const routes: Routes = [
  {
    path: '',
    component: SmsdetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SmsdetailsPage]
})
export class SmsdetailsPageModule {}
