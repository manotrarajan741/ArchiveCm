import { Component, OnInit } from '@angular/core';
import { NavController,MenuController,LoadingController,Events, Platform, ToastController} from '@ionic/angular';
import { ServiceService } from '../../app/api/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  resultData: any;
  totalBirthday:any;
  totalAnniversary:any;
  totalCompanyAnniversary:any;
  totalParty:any;
  totalEmail:any;
  totalSms:any;
  dashBorad = [];
  subscription: any;
 

  constructor(
    public platform: Platform,
    public menu:MenuController,
    private navCtrl: NavController,
    public loadingController: LoadingController, 
    private service: ServiceService,
    public events :Events,  
    public router :Router,
     public toastController: ToastController,
  ) { 
    this.menu.enable(true);
  }
  
  ionViewDidEnter() {this.dashBoard(); this.subscription = this.platform.backButton.subscribe(() => { navigator['app'].exitApp(); });}
  ionViewWillLeave() { this.subscription.unsubscribe(); }
  ngOnInit() {
   
  }
  dashBoard()
  {
    this.events.publish('user:nameLogin');
    this.presentLoading();
    this.service.dashBoard()
    .subscribe(
      data => {
       
        this.resultData = data;
        if(this.resultData.flag == true)
        {
           this.dashBorad = this.resultData.data;  
           this.loaderdismiss();
        }
      },
      error => {
        this.loaderdismiss();
        this.presentToast('Something went wrong, try again.','danger'); 
       
    });
  }
  gotoPage(no)
  {
    if(no == 1){
      this.events.publish('user:partylist');
      this.router.navigate(['/partylist']);   
    }else{
      this.router.navigate(['/birthdayanniversary']);   
    }
  }
/**
 * 
 * @param msg 
 * @param colorCss 
 */

async presentToast(msg,colorCss) {
  const toast = await this.toastController.create({
    message: msg,
    position: 'top',
    animated:true,
    color: colorCss,
    showCloseButton:true,
    duration: 2000
  });
  toast.present();
}
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please Wait...',
      id: 'loader',
      duration: 500
    });
    await loading.present();
  }
  
  async loaderdismiss() {
    return await this.loadingController.dismiss(null, null, 'loader');
  }
}
