import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController,Events, Platform} from '@ionic/angular';
import { ServiceService } from '../../app/api/service.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  resultData: any;
  notiList: any[] = [];
  listShow=true;
  subscription: any;

  constructor(
    public loadingController: LoadingController, 
    private service: ServiceService,
    public events: Events,
    private platform: Platform,
  ) { }
  ionViewDidEnter() {this.subscription = this.platform.backButton.subscribe(() => { navigator['app'].exitApp(); });}
  ionViewWillLeave() { this.subscription.unsubscribe(); }
  ngOnInit() {
    this.events.publish('user:nameLogin');
    this.showNotification()
  }
  showNotification()
  {
    this.presentLoading();
    this.service.notificationList()
    .subscribe(
      data => {
       
        this.resultData = data;
        this.notiList=[];
        if(this.resultData.flag == true)
        {
            if (this.resultData.data.length > 0) {
              this.listShow=true; 
              for(let i=0;i<this.resultData.data.length;i++)
              {
                this.notiList.push(this.resultData.data[i]);
              }
             }else{
              this.listShow=false;
            } 
            this.loaderdismiss();
        }else{
          this.listShow=false;
          this.loaderdismiss();
        }
      },
      error => {
        this.loaderdismiss();
       
    });
  }


  onChangeTime(status,noti_id)
  {
    this.service.notificationUpdate(status,noti_id)
    .subscribe(
      data => {
        this.loaderdismiss();
        this.showNotification();
      },
      error => {
        this.loaderdismiss();
       
    });
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
