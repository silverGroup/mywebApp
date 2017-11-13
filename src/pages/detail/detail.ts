import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {LoginPage} from '../login/login'
import {NotFoundPage} from '../not-found/not-found'
import {CartPage} from '../cart/cart'
/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  //存储图片信息的数组
  picList:Array<any> = [];
  //保存所有的详情数据
  detailInfo:any;

  //保存id
  productId:number;
  constructor(private myHttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    //解析index传递来的参数
    let myId:number = this.navParams.get('id')
    this.productId = myId;
    //向服务器要id为myId的详情信息
    this.loadData(myId);
  }

  loadData(id:number){
    this.myHttp
    .sendRequest("http://localhost/framework_codes/data/product/details.php?lid="+id)
    .subscribe((result:any)=>{
      console.log(result);
      if(result){
        this.picList = result.details.picList;
        this.detailInfo  =result.details;
      }
    })

  }

  jumpToNotFound(){
    this.navCtrl.push(NotFoundPage);
  }

  jumpToCart(){
    this.navCtrl.push(CartPage);
  }

  //添加到购物车
  addToCart(){
    this.myHttp
    .sendRequest("http://localhost/framework_codes/data/cart/add.php?buyCount=1&lid="+this.productId)
    .subscribe((result:any)=>{
      console.log(result);
      if(result)
      {
        if(result.code == 200){
          //添加成功
          this.myHttp.showToast('添加成功');
        }
        else if (result.code == 300){
          //未登录
          this.myHttp.showToast('未登录');
          this.navCtrl.push(LoginPage);
        }
        else if(result.code == 500){
          //添加失败
          this.myHttp.showToast('添加失败');
        }
      }
    })
  }

}
