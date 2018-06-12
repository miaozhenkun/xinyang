import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { GlobalData } from "../providers/GlobalData";
import { NativeService } from "../providers/NativeService";
import {BadgeSinhService} from "../providers/BadgeSinhService";
import {UserService} from "../providers/UserService";
import {JPushService} from "ionic2-jpush";
import {ScreenOrientation} from "@ionic-native/screen-orientation";

/**
 * app 根组件
 */
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = TabsPage;// 根页面
  backButtonPressed: boolean = false;// 返回键是否已触发
  @ViewChild('myNav') nav: Nav;// 导航

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private toast: ToastController,
    public storage: Storage,
    private globalData: GlobalData,
    private screenOrientation: ScreenOrientation,
    private nativeService: NativeService,public  badge:BadgeSinhService,public userService: UserService,   private jPushPlugin: JPushService) {

    let that = this;
    this.platform = platform;
    this.toast = toast;
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      that.statusBar.styleDefault();
      that.statusBar.styleLightContent();
      that.splashScreen.hide();
     // that. statusBar.overlaysWebView(true);
      //that.  statusBar.backgroundColorByHexString('#01657E');
      this.initializeApp();
      // 获取token并放入全局变量
      this.storage.get('token').then(token => {
        that.globalData.token = token;
      })
      this.globalData.serial=this.nativeService.getSerial();
      this.userService.isLogin().then(isLogin => {
        if (isLogin) {
          this.userService.getLoginInfo().then(userInfo => {
            this.userService.getNum({ IEMI:  this.globalData.serial + '',authority:userInfo.authority}).subscribe(data => {
              let obj: any = data;
              this.badge.setBadge(parseInt(obj.icNum)+parseInt(obj.inNum)+parseInt(obj.reNum));
            })
          });
        }else {
          this.userService.getNum({ IEMI:  this.globalData.serial + '',authority:0}).subscribe(data => {
            let obj: any = data;
            this.badge.setBadge(parseInt(obj.icNum)+parseInt(obj.inNum)+parseInt(obj.reNum));
          })
        }
      });


      // 极光推送
      //this.init();
      this.jPushPlugin.openNotification()
        .subscribe( res => {
            this.jPushPlugin.setApplicationIconBadgeNumber(0);
            if(res.extras.type!="eventsReport"){
              this.nav.push("KxNewsDegtailPage", { id: res.extras.id });
            }else {
              this.nav.push("ReportDetailPage", { id: res.extras.id,authority:2});
            }
        });

      this.jPushPlugin.receiveNotification()
        .subscribe( res => {
        });

      this.jPushPlugin.receiveMessage()
        .subscribe( res => {
          console.log('收到推送');
          console.log(res)
        });
    });
  }

  /**
   * 初始化
   */
  initializeApp() {
    // 启动完成
    this.platform.ready().then(() => {
      //注册返回按键事件
      this.platform.registerBackButtonAction((): any => {
        if (this.screenOrientation.type === 'landscape-primary') {
          this.nativeService.showToast("请先退出全屏",2000,"center");
          return;
        }
        // 按下返回键时，先关闭键盘
        // if (this.keyboard.isOpen()) {
        //   this.keyboard.close();
        //   return;
        // }
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        if (!(page instanceof TabsPage)) {
          if (!this.nav.canGoBack()) {
            //当前页面为tabs，退出APP
            return this.showExit();
          }
          //当前页面为tabs的子页面，正常返回
          return this.nav.pop();
        }
        let tabs = page.tabs;
        let activeNav = tabs.getSelected();
        if (!activeNav.canGoBack()) {
          //当前页面为tab栏，退出APP
          return this.showExit();
        }
        //当前页面为tab栏的子页面，正常返回
        return activeNav.pop();
      }, 101);

    });
  }

  // 双击退出提示框
  showExit() {
    //当触发标志为true时，即2秒内双击返回按键则退出APP
    if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
      this.nativeService.showToast("再按一次退出应用");
      this.backButtonPressed = true;
      //2秒内没有再次点击返回则将触发标志标记为false
      setTimeout(() => {
        this.backButtonPressed = false;
      }, 2000)
    }
  }

  /**
   * 注册极光
   */
  init() {
    this.jPushPlugin.init()
      .then(res =>{
          //alert(res)
      })
      .catch(err => alert(err))
  }

  /**
   * 获取ID
   */
  getRegistrationID() {
    this.jPushPlugin.getRegistrationID()
      .then(res => alert(res))
      .catch(err => alert(err))
  }

  /**
   * 设置标签
   */
  setTags() {
    this.jPushPlugin.setTags({
      sequence: Date.now(),
      tags: ['tag1', 'tag2']
    })
      .then((res:any) => {
        console.log(res.tags.toString())
      })
      .catch(err => {
        alert(err);
        console.log(err)
      })
  }
}
