import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UserService } from "../../../providers/UserService";
import { NativeService } from "../../../providers/NativeService";

/**
 * 意见反馈
 */
@IonicPage()
@Component({
  selector: 'page-feed-back',
  templateUrl: 'feed-back.html',
})
export class FeedBackPage {

  feedbackMsg;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    private nativeService: NativeService) {

  }

  ionViewCanEnter() {
    return this.userService.isLogin(true);
  }

  submit() {
    if(this.feedbackMsg){
      this.userService.feedBack({ feedbackMsg: this.feedbackMsg }).subscribe(data => {
        this.nativeService.showToast('意见反馈成功');
        this.navCtrl.pop();
      })
    }else {
      this.nativeService.showToast('请输入反馈内容');
    }

  }

}
