import {ChangeDetectorRef, Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {Device} from "@ionic-native/device";
import {UserService} from "../../providers/UserService";
import {Events} from 'ionic-angular';
import {BadgeSinhService} from "../../providers/BadgeSinhService";

/**
 * 消息首页
 */
@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  items;
  serial;
  reNum = 0;// 未读报告总数
  icNum = 0;// 未读快讯总数
  inNum = 0;// 未读安全提醒总数

  constructor(public navCtrl: NavController,
              public device: Device,
              public userService: UserService,
              public cd: ChangeDetectorRef, public events: Events, public  badge: BadgeSinhService) {
  }

  ionViewDidEnter() {
    if (this.device.uuid) {
      this.serial = this.device.uuid;
    } else {
      this.serial = '123456';
    }
    this.doRefresh(null);
  }

  // 刷新消息
  doRefresh(refresher) {

    this.userService.isLogin().then(isLogin => {
      if (isLogin) {
        this.userService.getLoginInfo().then(userInfo => {
          this.userService.getNum({IEMI: this.serial + '', authority: userInfo.authority}).subscribe(data => {
            let obj: any = data;
            this.icNum = obj.icNum;
            this.inNum = obj.inNum;
            this.reNum = obj.reNum;
            this.badge.setBadge(parseInt(obj.icNum) + parseInt(obj.inNum) + parseInt(obj.reNum));
          })
        });
      } else {
        this.userService.getNum({IEMI: this.serial + '', authority: 0}).subscribe(data => {
          let obj: any = data;
          this.icNum = obj.icNum;
          this.inNum = obj.inNum;
          this.reNum = obj.reNum;
          this.badge.setBadge(parseInt(obj.icNum) + parseInt(obj.inNum) + parseInt(obj.reNum));
        })
      }
      if (refresher) {
        refresher.complete();
      }
    });
  }

}
