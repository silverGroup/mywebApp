import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {LoginPage} from '../login/login'
import {IndexPage} from '../index/index'
import {OrderConfirmPage} from '../order-confirm/order-confirm'
/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  //保存的是用户是否登录
  isUserLogin:boolean = false;
  //定义数组 用来保存购物车列表
  cartList:Array<any> = [];
  itemList:Array<any>=[];
  constructor(private myhttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  ionViewWillEnter(){
    this.checkUserLogin();
  }

  //检查用户是否登录
  checkUserLogin(){
    this.myhttp
    .sendRequest("http://localhost/Framework_codes/data/user/session_data.php")
    .subscribe((result:any)=>{
        if(result)
        {
          if(result.uid){
            //登录状态
            this.isUserLogin = true;
            this.getCartInfo();
          }
          else{
            //未登录
            this.isUserLogin = false;
          }
        }
    })
  }

  //跳转到登录页
  jumpToLogin(){
    this.navCtrl.push(LoginPage);
  }

  //跳转到首页 ?
  jumpToIndex(){
    //this.navCtrl.push(IndexPage);
    console.log("test-----",this.navCtrl.parent);
    this.navCtrl.parent.select(0);
  }

  //获取购物车数据
  getCartInfo(){
    this.myhttp
    .sendRequest('http://localhost/Framework_codes/data/cart/list.php')
    .subscribe((result:any)=>{
      // console.log(result);
      //保存服务器返回的购物车列表数据
      this.cartList = result.data;
      console.log(this.cartList);
    })
  }

  //从购物车中去删除某一个产品
  deleteFromCart(index){
     this.myhttp
    .sendRequest('http://localhost/Framework_codes/data/cart/del.php?iid='+this.cartList[index].iid)
    .subscribe((result:any)=>{
      // console.log(result);
      //保存服务器返回的购物车列表数据
      if(result.code == 200)
      {
        //删除成功，从cartList中清除改数据
        this.cartList.splice(index,1);
      }
      else{
        //删除失败
        this.myhttp.showToast('删除失败');
      }
      
    })
  }
  //确定是否被勾选上
  selectCheck(iid){
    // console.log(lid);
    var index=this.itemList.indexOf(iid)
    if(index===-1){
      //未找到则进行加入数组中
      this.itemList.push(iid);
    }else{
       this.itemList.splice(index,1);
    }
    console.log(this.itemList);
  }
  //点击全选，确定lid是否在itemList 在则不添加，不在，则将所有cartlist内的lid添加到itemList
  selectAll(){
    // console.log(this.cartList);
    for(var c of this.cartList){
      // console.log(c.lid);
      var index=this.itemList.indexOf(c.iid);
      if(index===-1){
         this.itemList.push(c.iid);
      }else{
       this.itemList.splice(index,1);
    }
    console.log(this.itemList);
    }
  }
  //计算总价格
  getTotalPrice(){
    let totalPrice = 0;
    for(var i=0;i<this.itemList.length;i++){
      var iid=this.itemList[i];
      for(var j=0;j<this.cartList.length;j++){
        if(this.cartList[j].iid==iid){
          //如果itemList选中的元素存在，则计算价格
          totalPrice += (parseInt(this.cartList[j].count)*parseFloat(this.cartList[j].price));
        } 
      }
    }
    return  totalPrice;
  }

  //修改购物车中指定产品的数量->并且修改其数据库信息
  modifyCount(isMinus:boolean,index:number){
    let previousCount = this.cartList[index].count;
    if(isMinus){
        if(previousCount == 1){
            return
        }
        else{
          previousCount--;
        }
    }
    else{
      previousCount++;
    }
    //将修改后的值 保存 并且修改到数据库中，更新数据库数量
    this.cartList[index].count = previousCount;
    this.myhttp.sendRequest("http://localhost/framework_codes/data/cart/update_count.php?iid="
    +this.cartList[index].iid+"&count="+previousCount)
    .subscribe((data)=>{
      // console.log(data);
    })
  }

  //跳转到订单支付页面
  jumpToOrderConfirm(){
    // 将数据库中的ischeck设置为被选上
    if(this.itemList.length>0){
    for(var c of this.cartList){
      if(this.itemList.indexOf(c.iid)==-1){
        var iid=c.iid;
        this.myhttp.sendRequest("http://localhost/framework_codes/data/cart/update_checked.php?iid="+iid+"&checked=0")
        .subscribe((result:any)=>{
            console.log(result);
        })           
      }
    }      
    for(var i of this.itemList){
      this.myhttp.sendRequest("http://localhost/framework_codes/data/cart/update_checked.php?iid="+i+"&checked=1")
      .subscribe((result:any)=>{
          console.log(result);
          if(result.code==200){
            this.navCtrl.push(OrderConfirmPage);
          }else{
            this.myhttp.showToast("网络故障");
          }
      })
    }
   
    }else{
      this.myhttp.showToast("请选择要结算的商品");
    } 
  }
}
