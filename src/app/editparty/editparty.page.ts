import { Component, OnInit } from '@angular/core';
import { NavController,MenuController,ToastController,LoadingController,Events} from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { ServiceService } from '../../app/api/service.service';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-editparty',
  templateUrl: './editparty.page.html',
  styleUrls: ['./editparty.page.scss'],
})
export class EditpartyPage implements OnInit {
  public id :any;
  resultData: any;
  partyListDetails: any[] = [];
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
  localUrl: any;
  img_name:any;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public loadingController: LoadingController, 
    private service: ServiceService,
     public toastController: ToastController,
    private router: Router,
    public events: Events,
    private fileChooser: FileChooser,
    private transfer: FileTransfer,
    private file: File,
    ) { }
   
    showPreviewImage(event: any) {
      if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
              this.localUrl = event.target.result;
    }
          reader.readAsDataURL(event.target.files[0]);
      }
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    this.presentLoading();
    this.service.partyDetails(this.id)
    .subscribe(
      data => { 
        this.resultData = data;
        if(this.resultData.flag == true)
        {
            this.comapanyname=this.resultData.data[0].companyname;
            this.address=this.resultData.data[0].address;
            this.groupname=this.resultData.data[0].groupname;
            this.post=this.resultData.data[0].post;
            this.mobile=this.resultData.data[0].mobile;
            this.email=this.resultData.data[0].email;
            this.city=this.resultData.data[0].city;
            this.state=this.resultData.data[0].state;
            this.country=this.resultData.data[0].country;
            this.pincode=this.resultData.data[0].pincode;
           this.birthday=this.resultData.data[0].birthdate;   
           this.anniversary=this.resultData.data[0].anniversarydate;
           this.comanniversary=this.resultData.data[0].comanniversarydate;
            this.contact1=this.resultData.data[0].personf;
            this.mobile1=this.resultData.data[0].mobilef;
            this.contact2=this.resultData.data[0].persons;
            this.mobile2=this.resultData.data[0].mobiles;
            this.contact3=this.resultData.data[0].persont;
            this.mobile3=this.resultData.data[0].mobilet;
            this.contact4=this.resultData.data[0].personfour;
            this.mobile4=this.resultData.data[0].mobilefour;
            this.bankdetails=this.resultData.data[0].bankdetail;
            this.bankacc=this.resultData.data[0].bankaccountno;
            this.ifsc=this.resultData.data[0].ifsccode;
            this.micr=this.resultData.data[0].micr;
            this.gstnno=this.resultData.data[0].gstnno;
            this.panno=this.resultData.data[0].panno;
            this.localUrl=this.resultData.data[0].full_image_profile;
          
            this.loaderdismiss();
        }
      },
      error => {
        this.loaderdismiss();  
    });
  }
  editParty(){
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
                this.updateData(this.img_name)
                  }, (err) => {
                // error
                this.img_name=''
                this.updateData(this.img_name)
              })
              }
          else{
            this.img_name='';
            this.updateData(this.img_name);
          }
    
    }
  }
    updateData(img_name)
    {
      let data ={
        "id":this.id,
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
        this.presentLoading();
        this.service.editParty(data)
        .subscribe(
          data => {
            this.loaderdismiss();
            this.resultData = data;
            if(this.resultData.flag == true)
            {
              this.events.publish('user:partyDetails');
              this.router.navigate(['/partydetails',{ "id": this.id }]);
              this.presentToast(this.resultData.msg ,'success');
            }
            },
          error => {
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
