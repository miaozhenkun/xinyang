import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DataAccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-data-access',
  templateUrl: 'data-access.html',
})
export class DataAccessPage {
  items;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items=[
      {name:'基本信息',num:12120403},
      {name:'医疗服务',num:5455854512},
      {name:'公共卫生',num:123644},
      {name:'综合管理',num:3866},
      {name:'全员人口',num:0},
      ]
  }

}
