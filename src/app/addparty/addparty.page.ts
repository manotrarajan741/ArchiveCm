import { Component, OnInit } from '@angular/core';
import { NavController,MenuController,ToastController,LoadingController,Events} from '@ionic/angular';
import { ServiceService } from '../../app/api/service.service';
import { ActivatedRoute,Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
@Component({
  selector: 'app-addparty',
  templateUrl: './addparty.page.html',
  styleUrls: ['./addparty.page.scss'],
})
export class AddpartyPage implements OnInit {
  resultData:any;
  comapanyname:any;
  address:any;
  groupname:any;
  post:any;
  mobile:any;
  email:any;
  city:any;
  state:any;
  country:any;
  pincode:any;
  birthday:any;
  anniversary:any;
  comanniversary:any;
  contact1:any;
  mobile1:any;
  contact2:any;
  mobile2:any;
  contact3:any;
  mobile3:any;
  contact4:any;
  mobile4:any;
  bankdetails:any;
  bankacc:any;
  ifsc:any;
  micr:any;
  gstnno:any;
  panno:any;
  img_name:any;
  localUrl: any;

  constructor(
    private navCtrl: NavController,
    public menu :MenuController,
    private service: ServiceService,
    public toastController: ToastController,
    public loadingController: LoadingController,  
    private router: Router,
    public events: Events,
    private fileChooser: FileChooser,
    private transfer: FileTransfer,
    private file: File,
  ) { 
    this.groupname='Default';
  }

  ngOnInit() {
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.localUrl = event.target.result;
  }
        reader.readAsDataURL(event.target.files[0]);
  
    }
}
  addParty()
  {
    
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.comapanyname == '' || this.comapanyname == null)
    {
      this.presentToast("Please Enter Company Name",'danger');
    }else if (this.post == '' || this.post == null) 
    {
      this.presentToast("Please Enter Post",'danger');
    }else if (this.mobile ==  "''" || this.mobile == null) 
    {
      this.presentToast("Please Enter Mobile No",'danger');
    }else if (this.email == '' || this.email == null) 
    {
      this.presentToast("Please Enter Email",'danger');
    }else if(!re.test(this.email)) {

      this.presentToast("Please Enter Valid Email",'danger');
    }else if (this.city == '' || this.city == null) 
    {
      this.presentToast("Please Enter City",'danger');
    }
    else if (this.state == '' || this.state == null) 
    {
      this.presentToast("Please Enter State",'danger');
    }else if (this.country == '' || this.country == null) 
    {
      this.presentToast("Please Enter Country",'danger');
    }else if (this.pincode == '' || this.pincode == null) 
    {
      this.presentToast("Please Enter Pincode",'danger');
    }else if (this.contact1 == '' || this.contact1 == null) 
    {
      this.presentToast("Please Enter Contact Person 1 Name",'danger');
    }
    else{
        this.presentLoading();
        if(this.localUrl != ''){
              const fileTransfer: FileTransferObject = this.transfer.create();
              let  options = {
              fileKey: "file",
              fileName: this.localUrl.substr(this.localUrl.lastIndexOf('/')+1),
              chunkedMode: false,
              mimeType: "multipart/form-data",
              params: { 'fileName': this.localUrl }
              };
          
              fileTransfer.upload(this.localUrl, 'http://demo.vthinksolution.com/codeigniter/quotemanager/services/uploadid.php', options)
              .then((data) => { 
              // success
                let name=JSON.parse(data.response);
                  this.img_name=name.img_name;
                  this.submitData(this.img_name)
                    }, (err) => {
                  // error
                  this.img_name='default-profile.png'
                  this.submitData(this.img_name)
                })
                }
                else{
                  this.img_name='default-profile.png'
                this.submitData(this.img_name);
                }
            }
    
  }
submitData(img_name)
{
      let data ={
        "u_id": localStorage.getItem("userId"),
        "companyname": this.comapanyname,
        "groupname": this.groupname,
        "address": this.address,
        "post": this.post,
        "mobile": this.mobile,
        "email": this.email,
        "city": this.city,
        "state": this.state,
        "country": this.country,
        "pincode": this.pincode,
        "birthdate": this.birthday,
        "anniversarydate": this.anniversary,
        "comanniversarydate": this.comanniversary,
        "contact1": this.contact1,
        "mobile1": this.mobile1,
        "contact2": this.contact2,
        "mobile2": this.mobile2,
        "contact3": this.contact3,
        "mobile3": this.mobile3,
        "contact4": this.contact4,
        "mobile4": this.mobile4,
        "bankdetail": this.bankdetails,
        "bankacno": this.bankacc,
        "ifsccode": this.ifsc,
        "micr": this.micr,
        "gstnno": this.gstnno,
        "panno": this.panno,
        "base64data":img_name
        }
       // console.log(data)
        this.presentLoading();
        this.service.addParty(data)
        .subscribe(
          data => {
            this.loaderdismiss();
            this.resultData = data;
           // console.log(this.resultData)
            if(this.resultData.flag == true)
             {
              this.events.publish('user:partylist');
              this.router.navigate(['/partylist']);
              this.presentToast(this.resultData.msg ,'success');
             }
            },
          error => {
           // console.log("error")
            this.loaderdismiss();
            this.presentToast('Something went wrong, try again.','danger');
           
        });
}
    showDate(e)
    {
    let birthday =  e.split("-");
    this.birthday = birthday[2] + '-' + birthday[1] + '-' + birthday[0];
    }
    showDateAnniversary(e)
    {
    let anniversary =  e.split("-");
    this.anniversary = anniversary[2] + '-' + anniversary[1] + '-' + anniversary[0];
    }
    showDateComanniversary(e)
    {
    let comanniversary =  e.split("-");
    this.comanniversary = comanniversary[2] + '-' + comanniversary[1] + '-' + comanniversary[0];
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
