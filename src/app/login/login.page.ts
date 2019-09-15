import { Component, OnInit } from '@angular/core';
import { NavController,MenuController,ToastController,LoadingController,Events, Platform} from '@ionic/angular';
import { ServiceService } from '../../app/api/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  username:string;
  password:string;
  tstatus:any;
  resultData: any;
  rememberMe:any
  subscription: any;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    public menu :MenuController,
    private service: ServiceService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public events: Events,  
    public router :Router         
  ) { 
      this.menu.enable(false);
      this.rememberMe = localStorage.getItem("rememberMe");
      if (this.rememberMe == '0' ||this.rememberMe == ''|| this.rememberMe == null)
      {
          this.username='';
          this.password='';
          this.tstatus=false;
      } else if(this.rememberMe == '1'){
        this.username=localStorage.getItem("username");
        this.password=localStorage.getItem("password");  ;
        this.tstatus=true;
      }
    }
    ionViewDidEnter() {this.subscription = this.platform.backButton.subscribe(() => { navigator['app'].exitApp(); });}
    ionViewWillLeave() { this.subscription.unsubscribe(); }
  
    ngOnInit() {}
  
  login()
  {
    if(this.username == '' || this.username == null)
    {
      this.presentToast("Please Enter Username",'danger');
    }else if (this.password == '' || this.password == null) 
    {
      this.presentToast("Please Enter Password",'danger');
    }else{
    this.presentLoading();
    this.service.userLogin(this.username,this.password)
    .subscribe(
      data => {
        this.loaderdismiss();
         this.resultData = data;
         if(this.resultData.flag == true)
         {
          localStorage.setItem("username", this.username);
          localStorage.setItem("password", this.password);
          localStorage.setItem("userId", this.resultData.data.id);
          localStorage.setItem("companyname", this.resultData.data.companyname);
          if (this.tstatus == true)
          {
            localStorage.setItem("rememberMe",'1');
          }else{
            localStorage.setItem("rememberMe",'0');  
          }

         this.presentToast("Successfully Login",'success');
         this.events.publish('user:nameLogin');
         this.router.navigate(['/dashboard']);   
       } else{
          this.presentToast(this.resultData.msg,'danger'); 
        }
       
      },
      error => {
        this.loaderdismiss();
        this.presentToast('Something went wrong, try again.','danger'); 
    });
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
