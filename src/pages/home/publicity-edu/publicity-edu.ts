import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeService} from "../../../providers/HomeService";

@IonicPage()
@Component({
  selector: 'page-publicity-edu',
  templateUrl: 'publicity-edu.html',
})
export class PublicityEduPage {
  items;
  constructor(public navCtrl: NavController, public navParams: NavParams,public homeservice:HomeService) {
  }

  ionViewDidLoad() {
    this.homeservice.getMovies({}).subscribe(data=>{
      this.items=data;
    })

  }
  goSec(title){
    this.navCtrl.push('PublicityEduSecPage',{title:title})
  }

}
