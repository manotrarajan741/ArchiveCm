import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmailbroadcastPage } from './emailbroadcast.page';

const routes: Routes = [
  {
    path: '',
    component: EmailbroadcastPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmailbroadcastPage]
})
export class EmailbroadcastPageModule {}
