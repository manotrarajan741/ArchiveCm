import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController,Events, Platform} from '@ionic/angular';
import { ServiceService } from '../../app/api/service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-birthdayanniversary',
  templateUrl: './birthdayanniversary.page.html',
  styleUrls: ['./birthdayanniversary.page.scss'],
})
export class BirthdayanniversaryPage implements OnInit {

  public active:any;
  public tabShow1:any;
  public tabShow2:any;
  resultData: any;
  toAnniversary: any[] = [];
  toBirth: any[] = [];
  toComAnniversary: any[] = [];
  upBirth: any[] = [];
  upAnniversary: any[] = [];
  upComAnniversary: any[] = [];
  listShowBirth:any;
  listShowAnni:any;
  listShowComAnni:any;
  listShowUpBirth:any;
  listShowUPAnni:any;
  listShowUPComAnni:any;
  listShow1=true;
  subscription: any;

  constructor(
    public platform: Platform,
    private navCtrl: NavController,
    public loadingController: LoadingController, 
    private service: ServiceService,
    public events: Events,
    public router :Router   
  ) { }
  ionViewDidEnter() {this.subscription = this.platform.backButton.subscribe(() => { navigator['app'].exitApp(); });}
  ionViewWillLeave() { this.subscription.unsubscribe(); }
  ngOnInit() {
    this.events.publish('user:nameLogin');
    this.active=1;
    this.tabShow1=true;
    this.tabShow2=false;
    this.showList()
  }
  showList()
  {
    this.presentLoading();
    this.service.birthAnniList()
    .subscribe(
      data => {
        this.resultData = data;
        this.toAnniversary=[];
        this.toBirth=[];
        this.toComAnniversary=[];
        this.upBirth=[];
        this.upAnniversary=[];
        this.upComAnniversary=[];
        if(this.resultData.flag == true)
        {
            
          if (this.resultData.tobirth.length > 0) {
              this.listShowBirth=true; 
              for(let i=0;i<this.resultData.tobirth.length;i++)
              {
                this.toBirth.push(this.resultData.tobirth[i]);
              }
            }else{
              this.listShowBirth=false;
            } 
            
            if (this.resultData.toanniversary.length > 0) {
             this.listShowAnni=true; 
              for(let i=0;i<this.resultData.toanniversary.length;i++)
              {
                this.toAnniversary.push(this.resultData.toanniversary[i]);
              }
            }else{
              this.listShowAnni=false;
            } 
            
            if (this.resultData.tocomanniversary.length > 0) {
             this.listShowComAnni=true; 
              for(let i=0;i<this.resultData.tocomanniversary.length;i++)
              {
                this.toComAnniversary.push(this.resultData.tocomanniversary[i]);
              }
            }else{
              this.listShowComAnni=false;
            }
            
            if (this.resultData.upbirth.length > 0) {
              this.listShowUpBirth=true; 
              for(let i=0;i<this.resultData.upbirth.length;i++)
              {
                this.upBirth.push(this.resultData.upbirth[i]);
              }
            }else{
              this.listShowUpBirth=false;
            }

            if (this.resultData.upanniversary.length > 0) {
              this.listShowUPAnni=true; 
              for(let i=0;i<this.resultData.upanniversary.length;i++)
              {
                this.upAnniversary.push(this.resultData.upanniversary[i]);
              }
            }else{
              this.listShowUPAnni=false;
            }

            if (this.resultData.upcomanniversary.length > 0) {
              this.listShowUPComAnni=true; 
              for(let i=0;i<this.resultData.upcomanniversary.length;i++)
              {
                this.upComAnniversary.push(this.resultData.upcomanniversary[i]);
              }
            }else{
              this.listShowUPComAnni=false;
            }
            this.loaderdismiss();
        }else{
          this.listShowComAnni=false;
          this.listShowAnni=false;
          this.listShowBirth=false;

          this.listShowUPComAnni=false;
          this.listShowUPAnni=false;
          this.listShowUpBirth=false;
          this.loaderdismiss();
        }
      },
      error => {
        this.loaderdismiss();
       
    });
  }
  
  /**
   * 
   * @param no 
   */
  tabSelect(no)
  {
    if(no == 1)
    {
      this.active=1;
      this.tabShow1=true;
      this.tabShow2=false;

    }else{
      this.active=0;
      this.tabShow2=true;
      this.tabShow1=false;
    }
  }

  gotowishcard(type,name)
  {  
    this.router.navigate(['/wishcard', { "type": type ,"name":name }]);
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
