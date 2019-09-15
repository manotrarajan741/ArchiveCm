import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public user_id:any;
  baseUrl = 'http://demo.vthinksolution.com/codeigniter/quotemanager/services/';
  deviceType='android';
 
  constructor(public http: HttpClient) { }

  /**
   * 
   * @param username 
   * @param password 
   */
    userLogin(username,password){
    
       let url =this.baseUrl+'login.php?username='+username+'&password='+password+'&deviceType='+this.deviceType+'';
       return this.http.get(url).pipe(map(
        (response) => response
      ));
    }

    dashBoard()
    {
      this.user_id=localStorage.getItem("userId");
      let url =this.baseUrl+'dashboard.php?&deviceType='+this.deviceType+'&user_id='+this.user_id+'';
       return this.http.get(url).pipe(map(
        (response) => response
      ));
    }
    
   partyList()
    {
      this.user_id=localStorage.getItem("userId");
      let url =this.baseUrl+'getallpartydetails.php?&deviceType='+this.deviceType+'&user_id='+this.user_id+'';
      return this.http.get(url).pipe(map(
        (response) => response
      ));
    }
    
    /**
     * 
     * @param id 
     */
    partyDetails(id)
    {
      this.user_id=localStorage.getItem("userId");
      let url =this.baseUrl+'getpartydetails.php?id='+id+'&deviceType='+this.deviceType+'&user_id='+this.user_id+'';
       return this.http.get(url).pipe(map(
        (response) => response
      ));
    }

    /**
     * 
     * @param id 
     */
    partyDelete(id)
    {
      this.user_id=localStorage.getItem("userId");
      let url =this.baseUrl+'deletepartydetails.php?id='+id+'&deviceType='+this.deviceType+'&user_id='+this.user_id+'';
      return this.http.get(url).pipe(map(
        (response) => response
      ));
    }

    /**
     * 
     * @param id 
     */
    addParty(data)
    {
     let url =this.baseUrl+'addpartydetails.php?data='+JSON.stringify(data)+'&deviceType='+this.deviceType+'';
      return this.http.get(url).pipe(map(
        (response) => response
      ));
    }
     /**
     * 
     * @param id 
     */
    editParty(data)
    {
      let url =this.baseUrl+'updatepartydetails.php?data='+JSON.stringify(data)+'&deviceType='+this.deviceType+'';
      return this.http.get(url).pipe(map(
        (response) => response
      ));
    }

    notificationList()
    {
      this.user_id=localStorage.getItem("userId");
      let url =this.baseUrl+'getnotificationdetails.php?deviceType='+this.deviceType+'&user_id='+this.user_id+'';
      return this.http.get(url).pipe(map(
        (response) => response
      ));
    }
    /**
     * 
     * @param status 
     * @param noti_id 
     */
    notificationUpdate(status,noti_id)
    {
     this.user_id=localStorage.getItem("userId");
     let url =this.baseUrl+'updatenotificationdetails.php?status='+status+'&id='+noti_id+'&deviceType='+this.deviceType+'&user_id='+this.user_id+'';
      return this.http.get(url).pipe(map(
        (response) => response
      ));
    }

    birthAnniList()
    {
      this.user_id=localStorage.getItem("userId");
      let url =this.baseUrl+'getbrithdetails.php?deviceType='+this.deviceType+'&user_id='+this.user_id+'';
      return this.http.get(url).pipe(map(
        (response) => response
      ));
    }

    /**
     * 
     * @param selected 
     * @param subject 
     * @param message 
     */
    emailSend(selected,subject,message)
    {
      this.user_id=localStorage.getItem("userId");
     let url =encodeURI(this.baseUrl+'sendemail.php?partyids='+selected+'&subject='+subject+'&content='+message+'&user_id='+this.user_id+'&deviceType='+this.deviceType+'');
      return this.http.get(url).pipe(map(
        (response) => response
      ));
    }

    filterListemail()
    {
      this.user_id=localStorage.getItem("userId");
      let url =this.baseUrl+'getuniquelist.php?deviceType='+this.deviceType+'&user_id='+this.user_id+'';
       return this.http.get(url).pipe(map(
        (response) => response
      ));
    }
    /**
     * 
     * @param cityadd 
     * @param groupadd 
     */
    filterpartyemail(cityadd,groupadd){
      this.user_id=localStorage.getItem("userId");
       let url =this.baseUrl+'filterparty.php?city='+cityadd+'&groupname='+groupadd+'&deviceType='+this.deviceType+'&user_id='+this.user_id+'';
        return this.http.get(url).pipe(map(
          (response) => response
        ));
      }

    /**
     * 
     * @param selected 
     * @param type 
     * @param message 
     */
      smsSend(selected,type,message)
      {
        this.user_id=localStorage.getItem("userId");
       let url =this.baseUrl+'sendsms.php?partyids='+selected+'&type='+type+'&content='+message+'&user_id='+this.user_id+'&deviceType='+this.deviceType+'';
       return this.http.get(url).pipe(map(
          (response) => response
        ));

     
      }
}
