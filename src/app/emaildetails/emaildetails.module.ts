import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EmaildetailsPage } from './emaildetails.page';
import { CKEditorModule } from 'ng2-ckeditor';


const routes: Routes = [
  {
    path: '',
    component: EmaildetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes), 
    HttpClientModule, 
    AngularEditorModule,
    CKEditorModule, 
    FormsModule
  ],
  declarations: [EmaildetailsPage]
})
export class EmaildetailsPageModule {}
