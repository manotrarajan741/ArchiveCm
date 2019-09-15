import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy,ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Contacts} from '@ionic-native/contacts/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Base64ToGallery,Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';  
import { Clipboard } from '@ionic-native/clipboard/ngx';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
   ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastController,
    Contacts,
    SocialSharing,
    Base64ToGallery,
    AndroidPermissions,
    File,
    FileTransfer,
    FileChooser,
    Clipboard,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
