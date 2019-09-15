import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SmsbroadcastPage } from './smsbroadcast.page';

const routes: Routes = [
  {
    path: '',
    component: SmsbroadcastPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SmsbroadcastPage]
})
export class SmsbroadcastPageModule {}
