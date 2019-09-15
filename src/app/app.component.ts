import { Component } from '@angular/core';
import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Party List',
      url: '/partylist',
      icon: 'people'
    },
    {
      title: 'Birthday / Anniversary',
      url: '/birthdayanniversary',
      icon: 'calendar'
    },
    {
      title: 'Notifications',
      url: '/notification',
      icon: 'notifications'
    },
    {
      title: 'Email Broadcast',
      url: '/emailbroadcast',
      icon: 'mail'
    },
    {
      title: 'Sms Broadcast',
      url: '/smsbroadcast',
      icon: 'chatbubbles'
    }
    ,
    {
      title: 'Logout',
      url: '/login',
      icon: 'lock'
    }
  ];
  activePage: any;
  nameLogin:any

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public events: Events
  ) {
    this.initializeApp();
    events.subscribe('user:nameLogin', () => {
      this.nameLogin=localStorage.getItem("username");;
    }); 
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#3284e8');
      this.splashScreen.hide();
    });
  }
  isActive(page) {
		this.activePage = this.router.url;
		if (this.activePage == page) {
			return true;
		}
  }
  backButtonEvent()
  {
    
    // this.platform.backButton.subscribe(async () => {
    //     this.activePage = this.router.url;
    //     alert(this.activePage)
    //     if(this.activePage == '/login')
    //     {
    //       alert("aa")
    //       navigator['app'].exitApp();
    //     }
    // });
  }
  //  ionViewDidEnter() {this.subscription = this.platform.backButton.subscribe(() => {  });}
  // ionViewWillLeave() { this.subscription.unsubscribe(); }
}
