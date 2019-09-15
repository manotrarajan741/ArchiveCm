import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController,Events,AlertController, Platform} from '@ionic/angular';
import { ServiceService } from '../../app/api/service.service';
@Component({
  selector: 'app-smsbroadcast',
  templateUrl: './smsbroadcast.page.html',
  styleUrls: ['./smsbroadcast.page.scss'],
})
export class SmsbroadcastPage implements OnInit {
  isIndeterminate:boolean;
  masterCheck:boolean;
  selectedArray: any[] = [];

  resultData: any;
  checkBoxList: any[] = [];
  listShow=true;
  subscription: any;
  constructor(
    private navCtrl: NavController,
    public loadingController: LoadingController, 
    private service: ServiceService,
    public events: Events,
    public alertController: AlertController,
    private platform: Platform,
  ) { 
  }
  ionViewDidEnter() {this.subscription = this.platform.backButton.subscribe(() => { navigator['app'].exitApp(); });}
  ionViewWillLeave() { this.subscription.unsubscribe(); }
  ngOnInit() {
    this.events.publish('user:nameLogin');
    this.showParty()
  }
  showParty()
  {
    this.presentLoading();
    this.service.partyList()
    .subscribe(
      data => {
        this.resultData = data;
        this.checkBoxList=[];
        if(this.resultData.flag == true)
        {
            if (this.resultData.data.length > 0) {
              this.listShow=true; 
              for(let i=0;i<this.resultData.data.length;i++)
              {
                this.checkBoxList.push(this.resultData.data[i]);
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
  openFilterModal()
  {
  this.navCtrl.navigateForward(['../filtersms']);
  }
  gotoSms()
  {
   if(this.selectedArray.length == 0)
    {
      this.presentAlert()
    }
    else{
     this.navCtrl.navigateForward(['/smsdetails',{ "selected": this.selectedArray }]);
    }
  }


  checkMaster() {
    this.selectedArray=[];
    setTimeout(()=>{
      this.checkBoxList.forEach(obj => {
        obj.isChecked = this.masterCheck;
        this.selectedArray.push(obj.id)
      });
    });
  }

  checkEvent() {
    this.selectedArray=[];
    const totalItems = this.checkBoxList.length;
    let checked = 0;
    this.checkBoxList.map(obj => {
      if (obj.isChecked){ checked++;
       this.selectedArray.push(obj.id)
        }
      else{
      }

    });
   if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Select At least One party.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
