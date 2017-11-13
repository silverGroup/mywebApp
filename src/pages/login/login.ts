import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} 
from '../../app/utility/service/myhttp.service'
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userName:string="";
  userPwd:string = "";
  
  constructor(private myHttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin(){
    //将用户名和密码 随着请求 发给给 user/login.php
    this.myHttp
    .sendRequest("http://localhost/Framework_codes/data/user/login.php?uname="+this.userName+"&upwd="+this.userPwd)
    .subscribe((result:any)=>{
      console.log(result);
      if(result){
        if(result.code == 200){
          this.myHttp.showToast('登录成功');
          this.navCtrl.pop();
        }
        else if(result.code == 201){
          this.myHttp.showToast('登录失败');
          //在登录失败 清空之前输入的信息
          this.userName = "";
          this.userPwd = "";
        }
      }
    })
  }

}
