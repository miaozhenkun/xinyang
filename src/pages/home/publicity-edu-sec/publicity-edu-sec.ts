import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeService} from "../../../providers/HomeService";



@IonicPage()
@Component({
  selector: 'page-publicity-edu-sec',
  templateUrl: 'publicity-edu-sec.html',
})
export class PublicityEduSecPage {
  title;
  items;
  constructor(public navCtrl: NavController, public navParams: NavParams,public homeservice:HomeService) {
  }

  ionViewDidLoad() {
    this.title=this.navParams.get('title');
    this.homeservice.getSecondList({title:this.title}).subscribe(data=>{
      this.items=data;
    })
  }
  goPlay(item){
    this.navCtrl.push('PublicityEduPlayPage',{item:item});
  }

}
