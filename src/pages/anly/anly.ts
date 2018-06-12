import {ChangeDetectorRef, Component} from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {UserService} from "../../providers/UserService";

/**
 * 事件上报主页
 */
@IonicPage()
@Component({
  selector: 'page-anly',
  templateUrl: 'anly.html'
})
export class AnlyPage {
  // 是否登录
  isLogin: Boolean = false;
  // 用户信息
  user: any = {};
  //当前用户权限
  permisson=0;
  constructor(
    public navCtrl: NavController, private userService: UserService, public  cd :ChangeDetectorRef) { }
  // 每次页面进入
  ionViewWillEnter() {
    this.refreshUserInfo();
  }
  // 刷新用户信息
  refreshUserInfo() {
    this.userService.isLogin().then(isLogin => {
      this.isLogin = isLogin;
      if (isLogin) {
        this.userService.getLoginInfo().then(userInfo => {
          this.user = userInfo;
          this.permisson=userInfo.authority;
        });
      }else{
        this.permisson=0;
      }
    });
  }
}
