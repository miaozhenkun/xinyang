import {ChangeDetectorRef, Component} from '@angular/core';
import {NavController, NavParams, IonicPage, AlertController} from 'ionic-angular';
import {UserService} from '../../providers/UserService';
import {Storage} from '@ionic/storage';
import {GlobalData} from "../../providers/GlobalData";
import {JPushService} from "ionic2-jpush";

/**
 * 个人中心
 */
@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {
  // 用户信息
  user: any = {};
  // 是否登录
  isLogin: Boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,    private jPushPlugin: JPushService,
              private userService: UserService, public storage: Storage, private globalData: GlobalData,public  cd :ChangeDetectorRef ,public alertCtrl: AlertController) {
  }

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
          //this.cd.detectChanges();
        });
      }
    });
  }

  // 退出登录
  logout() {
      let alert = this.alertCtrl.create({
        title: '确定退出登录吗?',
        buttons: [
          {
            text: '否',
            handler: () => {
            }
          },
          {
            text: '是',
            handler: () => {
              this.storage.set("token", '');
              this.globalData.token = '';
              this.userService.logout().then(() => {
                this.refreshUserInfo();
              });
              this.jPushPlugin.deleteAlias({sequence:999});
              this.jPushPlugin.cleanTags({sequence:888});
            }
          }
        ]
      });
      alert.present();
  }

  // 版本检测
  detectVersion() {
    this.navCtrl.push("CheckVersionPage");
  }

  // 跳转意见反馈页面
  toPageFeedBack() {
    this.navCtrl.push("FeedBackPage");
  }

  // 跳转关于页面
  toPageAppAbout() {
    this.navCtrl.push("AppAboutPage");
  }

  // 跳转登录页面
  toPageLogin() {
    if (this.isLogin) {
      this.navCtrl.push("UserInfoViewPage", {userInfo: this.user});
    } else {
      this.navCtrl.push("LoginPage");
    }
  }

  //修改密码
  changePassword() {
    this.navCtrl.push('ChangePasswordPage');
  }


}
