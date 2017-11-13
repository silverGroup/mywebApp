import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {IndexPage} from '../index/index'
import {CartPage} from '../cart/cart'
import {UserCenterPage} from '../user-center/user-center'
import {NotFoundPage} from '../not-found/not-found'
import {SettingsPage} from '../settings/settings'

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  indexPage;
  cartPage;
  userCenterPage;
  notFoundPage;
  settingsPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.indexPage = IndexPage;
    this.cartPage = CartPage;
    this.userCenterPage = UserCenterPage;
    this.notFoundPage = NotFoundPage;
    this.settingsPage=SettingsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
