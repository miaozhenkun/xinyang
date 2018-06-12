import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        name: "信阳市中心医院",
        jinzhan: "移动专线已连通",
        ready: "一体机已部署",
        anly: "已完成",
        upload: "已完成",
        beizhu: "已上传37种业务表",
        num: "30914568",
        state: "数据上传正常"
      },
      {
        name: "信阳市中医院",
        jinzhan: "vpn专线已连通",
        ready: "一体机已部署",
        anly: "已完成",
        upload: "已完成",
        beizhu: "已上传37种业务表",
        num: "3949344",
        state: "基本信息数据从2月24日开始中断，门诊和住院信息从1月22日中断"
      },
      {
        name: "信阳市第一人民医院",
        jinzhan: "移动专线已连通",
        ready: "一体机已部署",
        anly: "已完成",
        upload: "已完成",
        beizhu: "已上传37种业务表",
        num: "6793343",
        state: "数据上传正常"
      }
    ];
    this.items1 = [
      {
        name: "信阳职业技术学院附属医院（第二人民医院）",
        jinzhan: "vpn专线已连通",
        ready: "一体机已部署",
        anly: "已完成",
        upload: "已完成",
        beizhu: "已上传37种业务表",
        num: "4938592",
        state: "数据上传从5月7号开始中断"
      },
    ];
  }

}
