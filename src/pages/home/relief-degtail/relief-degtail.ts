import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeService} from "../../../providers/HomeService";

/**
 * Generated class for the ReliefDegtailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relief-degtail',
  templateUrl: 'relief-degtail.html',
})
export class ReliefDegtailPage {
  id;
  item;
  constructor(public navCtrl: NavController, public navParams: NavParams,public HomeService:HomeService) {
  }

  ionViewDidLoad() {
    this.id = this.navParams.data.id;
    this.HomeService.getTfIntenareliefFbDetails({id:this.id}).subscribe(data=>{
      this.item=data[0];
    })
  }
  ionViewDidEnter() {

  }

}
