import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform, LoadingController} from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import  html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';
import htmlToImage from 'html-to-image';


@Component({
  selector: 'app-wishcard',
  templateUrl: './wishcard.page.html',
  styleUrls: ['./wishcard.page.scss'],
})
export class WishcardPage implements OnInit {
  public type :any;
  public birthday :any;
  public anniversary :any;
  public comAnniversary : any;
  name: any;
  imgPath: string;
  base64DataImage: any; 
  widthpx = 0;
  heightpx = 0;
  imagepath: string = '../../assets/image/birthdaycard1.png';
  imagepath1: string = '../../assets/image/anniversarycard.png';
  imagepath2: string = '../../assets/image/frame.jpg';
 
  msgBirthday:any;
  msgAnniversary:any;
  msgComAnniversary:any;
  img:any;
  img1:any;
  img2:any;
  
  constructor(
    private route: ActivatedRoute,
		private socialSharing: SocialSharing,
		public sanitizer: DomSanitizer,
    public platform : Platform,
    public loadingController: LoadingController, 
    ) { 
      this.birthday=false;
      this.anniversary=false; 
      this.comAnniversary=false;
  
      this.platform.ready().then((readySource) => {
        this.widthpx = platform.width();  
        this.heightpx = platform.height() - 140;
        });	 
    }

  ngOnInit() {
    this.type = this.route.snapshot.params['type'];
    this.name = this.route.snapshot.params['name'];
    if(this.type == 'birthday')
    {
      this.birthday=true;
    }
    if(this.type == 'anniversary')
    {
      this.anniversary=true;
    }
    if(this.type == 'comAnniversary')
    {
      this.comAnniversary=true;
    }
  }
  wishSendBirthday()
  {
    this.presentLoading();
     this.msgBirthday='Dear '+this.name+', We wish you a very *HAPPY BIRTHDAY*  Best wishes from us.   Regards : '+localStorage.getItem("companyname");
      htmlToImage.toJpeg(document.getElementById('preview'), { quality: 0.4})
      .then(dataUrl=> {
        this.img=dataUrl;
        this.socialSharing.share(this.msgBirthday, null,this.img, null);
        this.loaderdismiss();
      });
  }

  wishSendAnniversary()
  {
    this.presentLoading();
    this.msgAnniversary='Dear '+this.name+', We wish you a very *HAPPY WEDDING ANNIVERSARY*  Best wishes from us.   Regards : '+localStorage.getItem("companyname");
    htmlToImage.toJpeg(document.getElementById('preview1'), { quality: 0.4})
    .then(dataUrl=> {
      this.img1=dataUrl;
     this.socialSharing.share(this.msgAnniversary, null,this.img1, null);
     this.loaderdismiss();
    });
  }

  wishSendComAnniversary()
  {
    this.presentLoading();
    this.msgComAnniversary='Dear '+this.name+', We wish you a very *HAPPY COMPANY ANNIVERSARY*  Best wishes from us.   Regards : '+localStorage.getItem("companyname");
    htmlToImage.toJpeg(document.getElementById('preview2'), { quality: 0.4})
    .then(dataUrl=> {
      this.img2=dataUrl;
     this.socialSharing.share(this.msgComAnniversary, null,this.img2, null);
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
