import { Component, OnInit } from '@angular/core';
import {ToastController,LoadingController} from '@ionic/angular';
import { ServiceService } from '../../app/api/service.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-smsdetails',
  templateUrl: './smsdetails.page.html',
  styleUrls: ['./smsdetails.page.scss'],
})
export class SmsdetailsPage implements OnInit {
  mainadd:any;
  message:any;
  resultData:any;
  selected:any;
  remaining: string;
  messagesAll: string;
  testShow: boolean;

  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
    public toastController: ToastController,
    public loadingController: LoadingController, 
    private router: Router, 
  ) {
    this.selected = this.route.snapshot.params['selected'];
    this.mainadd=0;
   }

  ngOnInit() {
  }
   mcqAnswer(answer){
    this.mainadd=answer;
   }
  smsSend()
  {
     if (this.message == '' || this.message == null) 
      {
        this.presentToast("Please Enter Message",'danger');
      }else{

        this.presentLoading();
        this.service.smsSend(this.selected,this.mainadd,this.message)
        .subscribe(
          data => {
            this.loaderdismiss();
            this.resultData = data;
            if(this.resultData.flag == true)
            { 
              this.router.navigate(['/smsbroadcast']);
              this.presentToast(this.resultData.msg,'success');
            }
            else{
              this.loaderdismiss();
              this.presentToast(this.resultData.msg,'danger');
            }
            },
          error => {
            this.loaderdismiss();
            this.presentToast('Something went wrong, try again.','danger');
          
        });
      }
    }
    
    onChangeText(e)
    {
      if(e != ''){
      this.testShow=true;
       var chars = new String(e) 
       var  messages = Math.ceil(chars.length / 160);
       var remaining = messages * 160 - (chars.length % (messages * 160) || messages * 160);
       this.remaining = remaining + ' characters remaining'
       this.messagesAll = messages + ' message(s)'
      }
      else{
        this.testShow=false;
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
