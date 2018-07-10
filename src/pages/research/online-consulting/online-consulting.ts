import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NativeService} from "../../../providers/NativeService";

/**
 * Generated class for the OnlineConsultingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-online-consulting',
  templateUrl: 'online-consulting.html',
})
export class OnlineConsultingPage {

  constructor(public navCtrl: NavController,private nativeService:NativeService,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnlineConsultingPage');
  }

  submit(){
    this.nativeService.showToast('提交成功');
    this.navCtrl.pop();
  }
}
