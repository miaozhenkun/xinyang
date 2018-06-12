import { Injectable } from '@angular/core';
import { Platform, App, NavController, Tabs, Keyboard } from 'ionic-angular';
import { NativeService } from './NativeService';

/**
 * 返回按钮服务
 */
@Injectable()
export class BackButtonService {

  // 控制硬件返回按钮是否触发，默认false
  backButtonPressed = false;

  // 构造函数 依赖注入
  constructor(public platform: Platform,
    private appCtrl: App,
    private keyboard: Keyboard,
    private nativeService: NativeService
  ) {
    this.backButtonPressed = false;
  }

  // 注册方法
  registerBackButtonAction(tabRef: Tabs): void {
    if (this.platform.is('ios')) {
      return;
    }
    this.platform.registerBackButtonAction(() => {

      // 按下返回键时，先关闭键盘
      if (this.keyboard.isOpen()) {
        this.keyboard.close();
        return;
      }

      // 获取NavController
      let activeNav: NavController = this.appCtrl.getActiveNav();
      // 如果可以返回上一页，则执行pop
      if (activeNav.canGoBack()) {
        activeNav.pop();
      } else {
        this.showExit();
      }
    });

  }

  // 退出应用方法
  private showExit(): void {
    // 如果为true，退出
    if (this.backButtonPressed) {
      //this.nativeService.showToast("跑这里来了" + this.backButtonPressed);
    } else {
      this.nativeService.showToast("再按一次退出应用");
      // 标记为true
      this.backButtonPressed = true;
      // 两秒后标记为false，如果退出的话，就不会执行了
      setTimeout(() => this.backButtonPressed = false, 2000);
    }
  }

}
