import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as echarts from 'echarts';
import {NativeService} from "../../providers/NativeService";

/**
 * Generated class for the MonitorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monitor',
  templateUrl: 'monitor.html',
})
export class MonitorPage {
  items;
  items1;
  items2;
  config;
  ischange;
  configone;
  option1;
  constructor(public navCtrl: NavController, public navParams: NavParams,private nativeService:NativeService) {
  }
  go(){
    this.nativeService.showToast('开发中。。。');
  }

}



