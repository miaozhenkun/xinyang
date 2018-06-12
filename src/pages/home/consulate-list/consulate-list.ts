import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from "../../../providers/HomeService";

/**
 * 使领馆
 */
@IonicPage()
@Component({
  selector: 'page-consulate-list',
  templateUrl: 'consulate-list.html',
})
export class ConsulateListPage {

  page = 1;
  pagesize = 20;
  hasmore = true;
  List: any;
  items: any;
  country;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public HomeService: HomeService
  ) { }

  ionViewDidLoad() {
    this.country = this.navParams.data.country;
    this.loaddata();
  }

  // 加载数据
  private loaddata() {
    this.HomeService.getEmAmbassadorName({ country: this.country })
      .subscribe(data => {
        this.items = data;
      })
  }

  //前往详情页面
  goDegtail(item) {
    this.navCtrl.push("NewsDegtailPage", { id: item.id, fromname: "使领馆" });
  }

}
