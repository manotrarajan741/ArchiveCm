import { Component, OnInit } from '@angular/core';
import {ToastController,LoadingController} from '@ionic/angular';
import { ServiceService } from '../../app/api/service.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';


@Component({
  selector: 'app-emaildetails',
  templateUrl: './emaildetails.page.html',
  styleUrls: ['./emaildetails.page.scss'],
})
export class EmaildetailsPage implements OnInit {
  selected:any;
  subject:any;
  message:any;
  resultData:any;
  public editorValue: string = '';
  ckeditorContent: string = '<p>Some html</p>';
  localUrl: any;
  img_name: any;
  CopyText:any;
  uploadText:any;

  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
    public toastController: ToastController,
    public loadingController: LoadingController, 
    private router: Router, 
    private fileChooser: FileChooser,
    private transfer: FileTransfer,
    private file: File,
    private clipboard: Clipboard
    ) { 
    this.selected = this.route.snapshot.params['selected'];
    this.uploadText=false; 
    this.message="<b>Dear Sir/Madam</b> </br> Write Some Text.. </br></br> <b>Best Regard</b> </br>  - "+localStorage.getItem("companyname");
  }

  
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '17rem',
    maxHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };


  showPreviewImage(event: any) {
    console.log(event);
    
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.localUrl = event.target.result;
           // console.log(this.localUrl)
    }
        reader.readAsDataURL(event.target.files[0]);
    }
    this.uploadText=false; 
}

  uploadImage(){

    if(this.localUrl != ''){
      this.presentLoading();
      const fileTransfer: FileTransferObject = this.transfer.create();
        let  options = {
        fileKey: "file",
        fileName: this.localUrl.substr(this.localUrl.lastIndexOf('/')+1),
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: { 'fileName': this.localUrl }
        };
    
        fileTransfer.upload(this.localUrl, 'http://demo.vthinksolution.com/codeigniter/quotemanager/services/uploadimage.php', options)
        .then((data) => { 
        // success
          let name=JSON.parse(data.response);
             this.CopyText=name.img_path;
            this.loaderdismiss();
             this.uploadText=true; 
              }, (err) => {
            // error
            this.loaderdismiss();
            this.presentToast('Something went wrong, try again.','danger');
            this.uploadText=false; 
          })
          }
      else{
        this.presentToast("Please Select Image.",'danger');
        this.uploadText=false; 
      }
  }
  //Copy Event
  copyText(){
    this.clipboard.copy(this.CopyText);
    this.presentToast('Text Copy !','success');
  }
  ngOnInit() {
  }
  emailSend()
  {
    if(this.subject == '' || this.subject == null)
    {
      this.presentToast("Please Enter Subject",'danger');
    }else if (this.message == '' || this.message == null) 
    {
      this.presentToast("Please Enter Message",'danger');
    }else{

      this.presentLoading();
      this.service.emailSend(this.selected,this.subject,this.message)
      .subscribe(
        data => {
         
          this.resultData = data;
          if(this.resultData.flag == true)
           {
             this.router.navigate(['/emailbroadcast']);
             this.presentToast(this.resultData.msg ,'success');
             this.loaderdismiss();
           }
           else{
            this.loaderdismiss();
            this.presentToast(this.resultData.msg ,'danger'); 
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
