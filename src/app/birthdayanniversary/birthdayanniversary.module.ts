import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BirthdayanniversaryPage } from './birthdayanniversary.page';

const routes: Routes = [
  {
    path: '',
    component: BirthdayanniversaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BirthdayanniversaryPage]
})
export class BirthdayanniversaryPageModule {}
