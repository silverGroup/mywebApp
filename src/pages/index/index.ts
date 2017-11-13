import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {DetailPage} from '../detail/detail'
import {NotFoundPage} from '../not-found/not-found'
/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  carouselItems:Array<any> = [];
  newArrivalItems:Array<any> = [];
  recommendedItems:Array<any> = [];
  topSaleItems:Array<any>=[];
  constructor(private myHttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    this.loadData();
  }

  loadData(){
    this.myHttp
    .sendRequest('http://localhost/framework_codes/data/product/index.php')
    .subscribe((result:any)=>{
      console.log(result);
      if(result){//如果服务器端返回的result有有效值，保存数据
        this.carouselItems = result.carouselItems;
        this.newArrivalItems = result.newArrivalItems;
        this.recommendedItems = result.recommendedItems;
        this.topSaleItems=result.topSaleItems;
        console.log(this.topSaleItems);
      }
    })
  }

  jumpToDetail(index){
    //跳转到详情页，同时将产品的id发给detail
    this.navCtrl.push(
      DetailPage,
      {id:this.recommendedItems[index].pid}
      );
  }
  jumpToCamera(){
    // 跳转到404页面
    this.navCtrl.push(NotFoundPage);
  }
  loadMore(infiniteScroll){
     setTimeout(()=>{
        for(var f of this.topSaleItems){
          this.recommendedItems.push(f);
          infiniteScroll.complete();
        } 
     },1000)
  }


}
