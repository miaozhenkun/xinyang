import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, ViewController } from 'ionic-angular';

import { UserService } from '../../../providers/UserService';
import { NativeService } from "../../../providers/NativeService";
import { RegisterPage } from '../register/register';
import { FindPasswordPage } from '../find-password/find-password';
import { Storage } from '@ionic/storage';
import { GlobalData } from "../../../providers/GlobalData";
import {JPushService} from "ionic2-jpush";

/**
 * 登录
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public params = {
    username: 'miao',
    password: '123456',
  }
  // 是否能返回
  isCanBack: Boolean = false;
  // 用户名
  username: any;
  // 密码
  password: any;

  constructor(
    private nativeService: NativeService,
    public navCtrl: NavController,
    private userService: UserService,
    private modalCtrl: ModalController,
    public storage: Storage,
    private globalData: GlobalData,
    public viewCtrl: ViewController,
    private jPushPlugin: JPushService
  ) {
  }

  // 每次页面进入
  ionViewWillEnter() {
    this.isCanBack = this.navCtrl.canGoBack();
  }

  /**
   * 登录
   */
  login() {
    if(this.params.username.length>0&&this.params.password.length>0){
      this.userService.login(this.params).then(data => {
        if (data) {
          this.nativeService.showToast("登录成功");
          let token: any = data;
          this.storage.set("token", token.token);
          this.globalData.token = token.token;
          this.checkuser(token);
          if(token.authority==2){
            this.setTags();
          }
          this.closeLogin();
        }
      })
    }else {
      this.nativeService.showToast('请输入账号密码');
    }

  }

  /**
   * 打开窗口-注册
   */
  openModalRegister() {
    this.modalCtrl.create(RegisterPage).present();
  }

  /**
   * 打开窗口-找回密码
   */
  openModalFindPassword() {
    this.modalCtrl.create(FindPasswordPage).present();
  }

  /**
   * 取消登录
   */
  closeLogin() {
    this.viewCtrl.dismiss();
    //this.navCtrl.setRoot('HomePage');
  }

  /**
   * 跳转首页
   */
  toPageHome() {
    this.navCtrl.setRoot('HomePage');
  }

  checkuser(userinfo){
    this.userService.getPushPerson().subscribe(data=>{
      for(var i in data){
        if(userinfo.username==data[i].name){
          this.setAlias(userinfo.username);
          break;
        }
      }
    })
  }
  /**
   * 设置别名
   */
  setAlias(username){
    this.jPushPlugin.setAlias({
      sequence: 999,
      alias:username,
    }).then((res:any) => {
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      })
  }

  /**
   * 设置标签
   */
  setTags() {
    this.jPushPlugin.setTags({
      sequence: 888,
      tags: ['root']
    }).then((res:any) => {
        console.log(res.tags.toString())
      })
      .catch(err => {
        console.log(err)
      })
  }


}
