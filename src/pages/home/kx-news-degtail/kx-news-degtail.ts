import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from "../../../providers/HomeService";

declare var T;

/**
 * 快讯
 */
@IonicPage()
@Component({
  selector: 'page-kx-news-degtail',
  templateUrl: 'kx-news-degtail.html',
})
export class KxNewsDegtailPage {
  id;
  item: any;
  map;
  @ViewChild('mapDiv') mapDiv;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public HomeService: HomeService,
  ) { }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.id = this.navParams.data.id;
    this.map = new T.Map('mapDiv');
    this.map.centerAndZoom(new T.LngLat(116.40769, 39.89945), 2);
    this.HomeService.getlbkxNewsDegtail({ id: this.id }).subscribe(data => {
      this.item = data[0];
      if (this.item.x && this.item.y&&T) {
        this.map.centerAndZoom(new T.LngLat(this.item.x, this.item.y), 2);
        this.map.addOverLay(new T.Marker(new T.LngLat(this.item.x, this.item.y)));
      }
    });
  }

}
