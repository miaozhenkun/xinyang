import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * 短信登录
 */
@IonicPage()
@Component({
  selector: 'page-login-sms',
  templateUrl: 'login-sms.html',
})
export class LoginSmsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginSmsPage');
  }

}
