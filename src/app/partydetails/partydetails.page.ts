import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController,AlertController,Events} from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { ServiceService } from '../../app/api/service.service';

@Component({
  selector: 'app-partydetails',
  templateUrl: './partydetails.page.html',
  styleUrls: ['./partydetails.page.scss'],
})
export class PartydetailsPage implements OnInit {
  public id :any;
  resultData: any;
  partyListDetails: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public loadingController: LoadingController, 
    private service: ServiceService,
    public alertController: AlertController,
    private router: Router,
    public events: Events,
  ) { 
    events.subscribe('user:partyDetails', () => {
      this.showParty();
    }); 
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.showParty()
  }
  showParty()
  {
    this.presentLoading();
    this.service.partyDetails(this.id)
    .subscribe(
      data => {
        this.resultData = data;
        if(this.resultData.flag == true)
        {
            this.partyListDetails=this.resultData.data[0];
            this.loaderdismiss();
        }
      },
      error => {
        this.loaderdismiss();  
    });
  }
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are You Sure Want to Delete?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.partyDelete(id)
          }
        }
      ]
    });

    await alert.present();
  }
  /**
   * 
   * @param id 
   */
  partyDelete(id)
  {
    this.service.partyDelete(this.id)
    .subscribe(
      data => {
        this.loaderdismiss();
        this.resultData = data;
        if(this.resultData.flag == true)
        {
          this.events.publish('user:partylist');
          this.router.navigate(['/partylist']);
        }
      },
      error => {
        this.loaderdismiss();  
    });
  }
  /**
   * 
   * @param id 
   */
  editParty(id)
  {
    this.router.navigate(['/editparty',{ "id": id }]);
  }
  listParty()
  {
    this.events.publish('user:partylist');
    this.router.navigate(['/partylist']);
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
