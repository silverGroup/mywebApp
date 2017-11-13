import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController} from 'ionic-angular';

/**
 * Generated class for the PayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  constructor(public viewCtrl:ViewController,public loadCtr:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  }
  totalprice:string;
  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
    this.totalprice=sessionStorage.getItem("price");
    console.log(this.totalprice);
  }
  showLoading(){
    // 显示一个
    let myLoad=this.loadCtr.create({
      content:'支付中',
      // duration:2000
    })
    myLoad.present();
    setTimeout(()=>{
      // 关闭支付loading
      myLoad.dismiss();
      // 关闭模态框
      this.viewCtrl.dismiss();
    },2000)
  }
  closePage(){
    // 关闭正在支付模块框
     this.viewCtrl.dismiss();
  }


}
