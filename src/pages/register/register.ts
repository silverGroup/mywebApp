import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login'
import {MyHttpService} from '../../app/utility/service/myhttp.service'
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  uname:string;
  upwd:string;
  uphone:string;
  uemail:string;
  isOk:boolean=true;
  errMsg:string;
  constructor(public myhttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  goLogin(){
    this.navCtrl.push(LoginPage);
  }
  // 验证是否同名
  isSameName(){
    this.myhttp.sendRequest("http://localhost/framework_codes/data/user/check_uname.php?uname="+this.uname)
    .subscribe((res:any)=>{
      console.log(res);
      if(res.code==201){
        this.isOk=false;
        this.errMsg="用户名已存在"
      }else{
        this.isOk=true;
        this.errMsg="用户名通过"
      }
    })
  }
  // 验证是否注册
  doregister(){
    if(this.isOk){
      this.myhttp.sendRequest("http://localhost/framework_codes/data/user/register.php?uname="+this.uname+
      "&upwd="+this.upwd+"&email="+this.uemail+"&phone="+this.uphone)
      .subscribe((res:any)=>{
        console.log(res);
        if(res.code==200){
          setTimeout(()=>{
            this.myhttp.showToast("注册成功 1s跳转到登录页面");
            this.navCtrl.push(LoginPage);
          },1000)
        }
      })
    }
  }
}
