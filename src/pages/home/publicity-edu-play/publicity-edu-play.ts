import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PublicityEduPlayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicity-edu-play',
  templateUrl: 'publicity-edu-play.html',
})
export class PublicityEduPlayPage {
  videoConfig: any;
  id: number;
  item;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
     this.item=this.navParams.get('item');
    this.videoConfig = {
      page: 'page-publicity-edu-play',
      // id: `player_${this.id}`,
      id: this.item.title,
      autoplay: true,
      poster: this.item.image,
      src: this.item.movie
    };

  }


}
