import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController, NavParams } from 'ionic-angular';
import {PayPage} from '../pay/pay'
import {MyHttpService} from '../../app/utility/service/myhttp.service'
/**
 * Generated class for the OrderConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {
  List:Array<any> = [];
  totalprice1:string="";
  totalprice:number=0;
  address:Array<any>=[];
  constructor(private myHttp:MyHttpService,public modelCtr:ModalController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmPage');
    this.loadData();

  }
  loadData(){
      this.myHttp.sendRequest("http://localhost/framework_codes/data/cart/list_checked.php")
      .subscribe((result:any)=>{
        console.log(result);
        this.List=result.data;
        console.log(this.List);
        for(var f of this.List){  
          this.totalprice+=parseFloat(f.price)*parseInt(f.count);
        }
        this.totalprice1+=this.totalprice;
      })
      this.myHttp.sendRequest("http://localhost/framework_codes/data/user/check_adress.php")
      .subscribe((result)=>{
        console.log(result);
        this.address=result;
        console.log(this.address);
      })
  }
  pay(){
    // 显示一个model窗口
    sessionStorage.setItem("price",this.totalprice1);
    let modelC=this.modelCtr.create(PayPage);
    modelC.present();
  }

}
