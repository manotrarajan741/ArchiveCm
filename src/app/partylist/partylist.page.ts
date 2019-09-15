import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController,ActionSheetController,Events, AlertController, Platform} from '@ionic/angular';
import { ServiceService } from '../../app/api/service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';

@Component({
  selector: 'app-partylist',
  templateUrl: './partylist.page.html',
  styleUrls: ['./partylist.page.scss'],
})
export class PartylistPage implements OnInit {
  resultData: any;
  partyList: any[] = [];
  listShow=true;
  subscription: any;

  constructor(
    private navCtrl: NavController,
    public loadingController: LoadingController, 
    private service: ServiceService,
    public events: Events,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    private contacts: Contacts,
    private socialSharing: SocialSharing,
    private platform: Platform,
  ) { 
    events.subscribe('user:partylist', () => {
      this.showParty();
    });   
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
        this.partyList=[];
        if(this.resultData.flag == true)
        {
            if (this.resultData.data.length > 0) {
              this.listShow=true; 
              for(let i=0;i<this.resultData.data.length;i++)
              {
                this.partyList.push(this.resultData.data[i]);
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
  
  
  gotoDetail(id)
  {
    this.navCtrl.navigateForward(['/partydetails',{ "id": id }]);
  }
  addParty()
  {
    this.navCtrl.navigateForward('/addparty');
  }


/*******************************ACTION SHEET POPUP START***********************************/

presentActionSheet1(fm,sms_mobile) {
  this.presentActionSheet(fm,sms_mobile);
}
async presentActionSheet(fm,sms_mobile) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Select Action',
    buttons: [{
      text: 'SAVE CONTACT',
      role: 'destructive',
      handler: () => {
        this.openSaveDailog(fm,sms_mobile);
      }
    }, {
      text: 'CALL',
      role: 'destructive',
      handler: () => {
        this.openCallDailog(sms_mobile);
      }
    }, {
      text: 'SEND SMS',
      handler: () => {
        this.openSmsDailog(sms_mobile);
      }
    }, {
      text: 'SHARE ON WHATSAPP',
      handler: () => {
        this.openWhatsAppDailog('+91 '+sms_mobile+'');
      }
    }, {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}
/*******************************ACTION SHEET POPUP END***********************************/
/*******************************ACTION SHEET ACTIONS START*******************************/
openSmsDailog(sms_mobile) {
  this.socialSharing.shareViaSMS("send sms text!", sms_mobile).then(() => {
    // Sharing via SMS is possible
  }).catch(() => {
    // Sharing via SMS is not possible
  });
}

openWhatsAppDailog(sms_mobile) {
  this.socialSharing.shareViaWhatsAppToReceiver(sms_mobile, "some message text!");
}

openCallDailog(sms_mobile) {
  window.location.href = "tel:" + sms_mobile + "";
}
openSaveDailog(fm,sms_mobile) {
  let contact: Contact = this.contacts.create();

  contact.name = new ContactName(null, fm);
  contact.phoneNumbers = [new ContactField('mobile', sms_mobile)];
  contact.save().then(
    () => {
      this.presentAlert('Contact', 'Contact Saved successfully');
    },
    (error: any) => console.error('Error saving contact.', error)
  );
}
/*******************************ACTION SHEET ACTIONS END********************************/

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

 
  async presentAlert(alertheader, alertsubheader) {
    const alert = await this.alertController.create({
      header: alertheader,
      subHeader: alertsubheader,
      buttons: ['OK']
    });

    await alert.present();
  }
}
