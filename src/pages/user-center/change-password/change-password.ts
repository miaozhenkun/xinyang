import { Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { UserService } from "../../../providers/UserService";
import { NativeService } from "../../../providers/NativeService";
import {GlobalData} from "../../../providers/GlobalData";
import {Storage} from '@ionic/storage';
/**
 * 修改密码
 */
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  newpassword;

  public params = {
    newpassword: '',
    oldpassword: '',
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private nativeService: NativeService, public storage: Storage, private globalData: GlobalData,public alertCtrl: AlertController
  ) { }

  ionViewCanEnter() {
    return this.userService.isLogin(true);
  }

  // 保存
  save() {
    if (this.params.newpassword == this.newpassword) {
      let alert = this.alertCtrl.create({
        title: '否确定保存,修改后需要重新登录?',
        buttons: [
          {
            text: '否',
            handler: () => {
            }
          },
          {
            text: '是',
            handler: () => {
              this.userService.changePassword(this.params).subscribe(data => {
                this.nativeService.showToast('密码修改成功');
                this.storage.set("token", '');
                this.globalData.token = '';
                this.userService.logout().then(() => {
                  this.navCtrl.remove(1);
                  this.navCtrl.push("LoginPage");
                });
              });
            }
          }
        ]
      });
      alert.present();
    } else {
      this.nativeService.showToast('两次输入密码不一致');
    }
  }


}
