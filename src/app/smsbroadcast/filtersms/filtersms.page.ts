import { Component, OnInit } from '@angular/core';
import {ToastController,LoadingController,NavController,Events} from '@ionic/angular';
import { ServiceService } from '../../../app/api/service.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-filtersms',
  templateUrl: './filtersms.page.html',
  styleUrls: ['./filtersms.page.scss'],
})
export class FiltersmsPage implements OnInit {
  resultData:any;
  citylist:any;
  grouplist:any;
  cityadd:any;
  groupadd:any;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private service: ServiceService,
    public toastController: ToastController,
    public loadingController: LoadingController, 
    private router: Router, 
    public events: Events
  ) { }

  ngOnInit() {
    this.filterList();
  }
    filterList()
    {
      this.presentLoading();
      this.service.filterListemail()
      .subscribe(
        data => {
          this.loaderdismiss();
          this.resultData = data;
          this.citylist=[];
          this.grouplist=[];
          if(this.resultData.flag == true)
        {
            if (this.resultData.citylist.length > 0) {
              for(let i=0;i<this.resultData.citylist.length;i++)
              {
                this.citylist.push(this.resultData.citylist[i]);
              }
            }
            if (this.resultData.grouplist.length > 0) {
              for(let i=0;i<this.resultData.grouplist.length;i++)
              {
                this.grouplist.push(this.resultData.grouplist[i]);
              }
            }
        }
          },
        error => {
          this.loaderdismiss();
          this.presentToast('Something went wrong, try again.','danger');
        
      });
    }

    smsSearch()
    {
    if(this.cityadd == '' || this.cityadd == undefined  ){
      this.cityadd ='';
     }
    if(this.groupadd == '' || this.groupadd == undefined){
      this.groupadd = '';
     }
    this.navCtrl.navigateForward(['/filterpagesms',{ "cityadd": this.cityadd ,"groupadd" : this.groupadd}]);
     
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
