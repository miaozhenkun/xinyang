import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";

/**
 * 欢迎页面
 */
@Component({
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtr: NavController) {
  }

  goToHome() {
    this.navCtr.setRoot(TabsPage);
  }

}
