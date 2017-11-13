import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{SettingsPage} from '../settings/settings'
import {MyHttpService} from '../../app/utility/service/myhttp.service'

/**
 * Generated class for the UpdateadrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-updateadr',
  templateUrl: 'updateadr.html',
})
export class UpdateadrPage {
   aid:any;
   ischeck:any;
   newaddress:string;
   newphone:string;
   newname:string;
   pronvice:string;
   city:string;
   area:string;
   cityList:Array<any> = [];
   areaList:Array<any>=[];
   userList:Array<any> = [];
   addressList:Array<any>=[];
   loadcity:Array<any>=[];
  constructor(public myhttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateadrPage');
    this.aid=this.navParams.get('aid');
    console.log(this.aid);
  }
   ionViewWillEnter(){
    this.loadData();
  }
  loadData(){
    this.myhttp.sendRequest("http://localhost/framework_codes/data/user/updateAdr.php?aid="+this.aid)
    .subscribe((res:any)=>{
      console.log(res);
      if(res){
        this.userList=res;
      }
    })
    this.myhttp.sendRequest("http://localhost/framework_codes/data/user/address_add.php")
    .subscribe((res:any)=>{
      console.log(res);
      if(res){
        this.loadcity=res;
        console.log(this.loadcity);
      }
    })
  }
   // 根据省获取市信息
  getRrgionList(){
    console.log(this.pronvice);
    this.cityList=[];
    for(var f of this.loadcity["city"]){
      if(f.provincecode==this.pronvice){
        this.cityList.push(f);
      }
    }
  }
  // 根据市获取县
  getCityList(){
    console.log(this.city);
     this.areaList=[];
    for(var f of this.loadcity["area"]){
      if(f.citycode==this.city){
        this.areaList.push(f);
      }
    }
  }
  goupdate(){
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
   if(!this.newaddress){
    this.newaddress=this.userList['address'];
   }
   if(!this.newphone){
      this.newphone=this.userList['cellphone'];
   }
   if(!this.newname){
      this.newname=this.userList['receiver']
   }
    console.log(this.newname,this.newphone,newprovince,
    newcity,newarea,this.newaddress,this.ischeck);
    this.myhttp.sendRequest("http://localhost/framework_codes/data/user/update_address.php?receiver="
    +this.newname+"&province="+newprovince+"&city="+newcity+"&county="+newarea+"&address="+this.newaddress+
    "&cellphone="+this.newphone+"&isdefault="+this.ischeck+"&aid="+this.aid)
    .subscribe((res:any)=>{
      console.log(res);
      if(res.code==200){
        this.myhttp.showToast("更新地址成功！");
        this.navCtrl.pop();
      }
    })
  }
}
