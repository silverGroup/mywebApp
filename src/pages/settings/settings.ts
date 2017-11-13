import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {LoginPage} from '../login/login'
import {UpdateadrPage} from '../updateadr/updateadr'
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
   isUserLogin:boolean = false;
   userList:Array<any> = [];
   addressList:Array<any>=[];
   loadcity:Array<any>=[];
   pronvice:string;
   city:string;
   area:string;
   cityList:Array<any> = [];
   areaList:Array<any>=[];
   ischeck:any;
   newaddress:string;
   newphone:string;
   newname:string;
  constructor(public myhttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.loadData();
  }
  ionViewWillEnter(){
    this.checkUserLogin();
    this.loadData();
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
            this. getUserMsg();
          }
          else{
            //未登录
            this.isUserLogin = false;
          }
        }
    })
  }
  // 获取用户信息
  getUserMsg(){
     this.myhttp
    .sendRequest("http://localhost/framework_codes/data/user/get_basic.php")
    .subscribe((result:any)=>{
      // console.log(result);
      this.userList=result;
    })
  }
  loadData(){
    this.myhttp.sendRequest("http://localhost/framework_codes/data/user/select_address.php")
    .subscribe((res:any)=>{
      // console.log(res);
      if(res.code==400){
       this.addressList=[];
      }else{
         this.addressList=res;
         console.log(this.addressList)
      }
    })
    this.myhttp.sendRequest("http://localhost/framework_codes/data/user/address_add.php")
    .subscribe((res:any)=>{
      // console.log(res);
      if(res){
        this.loadcity=res;
        // console.log(this.loadcity);
      }
    })
  }
  // 根据省获取市信息
  getRrgionList(){
    // console.log(this.pronvice);
    this.cityList=[];
    for(var f of this.loadcity["city"]){
      if(f.provincecode==this.pronvice){
        this.cityList.push(f);
      }
    }
    // console.log(this.cityList);
  }
  // 根据市获取县
  getCityList(){
    // console.log(this.city);
     this.areaList=[];
    for(var f of this.loadcity["area"]){
      if(f.citycode==this.city){
        this.areaList.push(f);
      }
    }
    // console.log(this.areaList);
  }
  // 点击删除
  deleteAddress(aid){
    this.myhttp.sendRequest("http://localhost/framework_codes/data/user/deleteaddress.php?aid="+aid)
    .subscribe((res:any)=>{
      // console.log(res);
      if(res.code==200){
         this.loadData();
      }
    })
  }
  // 更新操作
  updateAddress(aid){
    this.navCtrl.push(UpdateadrPage,{aid:aid});
  }
  //下拉刷新
 doRefresh(refresher){
    // console.log('触发了方法');
    // console.log(refresher);
    //完成数据的获取和绑定
    setTimeout(()=>{
    this.loadData();
    },1000)
    //通知ionic框架，结束刷新动作
      refresher.complete();
  }
  // 点击提交 插入地址
  gosubmit(){
    let newprovince="",newcity="",newarea="";
    for(var f of this.loadcity['province']){
      if(f.code==this.pronvice){
        newprovince=f.name;
      }   
    }
    for(var f of this.loadcity['city']){
      if(f.code==this.city){
        newcity=f.name;
      }   
    }
    for(var f of this.loadcity['area']){
      if(f.code==this.area){
        newarea=f.name;
      }   
    }
    if(this.ischeck){
      this.ischeck=1;
    }else{
      this.ischeck=0;
    }
    // console.log(this.newname,this.newphone,newprovince,
    // newcity,newarea,this.newaddress,this.ischeck);
    this.myhttp.sendRequest("http://localhost/framework_codes/data/user/address_newadd.php?receiver="
    +this.newname+"&province="+newprovince+"&city="+newcity+"&county="+newarea+"&address="+this.newaddress+
    "&cellphone="+this.newphone+"&isdefault="+this.ischeck)
    .subscribe((res:any)=>{
      console.log(res);
      if(res.code==200){
        this.newname="";this.newphone="";
        this.pronvice="";this.city="";this.area="";
        this.newaddress="";this.ischeck=false;
        this.loadData();
      }
    })
  }
  goLogin(){
    this.navCtrl.push(LoginPage);
  }
}
