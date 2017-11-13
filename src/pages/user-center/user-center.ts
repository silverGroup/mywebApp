import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {LoginPage} from '../login/login'
import {RegisterPage} from '../register/register'
/**
 * Generated class for the UserCenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {
   isUserLogin:boolean = false;
   userList:any;
  constructor(private myhttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCenterPage');
    this.getUserMsg()
  }
   ionViewWillEnter(){
    this.checkUserLogin();

  }
  checkUserLogin(){
    this.myhttp
    .sendRequest("http://localhost/Framework_codes/data/user/session_data.php")
    .subscribe((result:any)=>{
        if(result)
        {
          if(result.uid){
            //登录状态
            this.isUserLogin = true;
            // this.getCartInfo();
          }
          else{
            //未登录
            this.isUserLogin = false;
          }
        }
    })
  }
  exitLogin(){
    // 退出登录
    this.myhttp.sendRequest("http://localhost/framework_codes/data/user/logout.php")
    .subscribe((result:any)=>{
      console.log(result);
      if(result.code==200){
        this.isUserLogin=false;
         this.myhttp.showToast('退出成功');
      }
    })
  }
  goLogin(){
    this.navCtrl.push(LoginPage);
  }
  goregister(){
    this.navCtrl.push(RegisterPage);
  }
   getUserMsg(){
     this.myhttp
    .sendRequest("http://localhost/framework_codes/data/user/get_basic.php")
    .subscribe((result:any)=>{
      console.log(result);
      this.userList=result;
    })
  }
}
