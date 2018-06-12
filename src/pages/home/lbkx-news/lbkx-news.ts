import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from "../../../providers/HomeService";

/**
 * 领保快讯
 */
@IonicPage()
@Component({
  selector: 'page-lbkx-news',
  templateUrl: 'lbkx-news.html',
})
export class LbkxNewsPage {

  items: any;
  page = 1;
  pagesize = 20;
  hasmore = true;
  List: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public HomeService: HomeService
  ) { }

  ionViewDidLoad() {
    this.page = 1;
    this.loaddata(true, null, null);
  }

  private loaddata(isFirstload, refresher: any, infiniteScroll: any) {
    this.HomeService.getlbkxNewsList({ Page: this.page }).subscribe(data => {
      if (refresher || isFirstload) {
        this.items = data;
      }
      if (refresher)
        refresher.complete();
      if (infiniteScroll) {
        this.items = this.items.concat(data);
        infiniteScroll.complete();
      }
      this.List = data;
      if (this.List.length < this.pagesize) {
        this.hasmore = false;
      } else {
        this.hasmore = true;
      }
    }, err => {
      if (refresher) {
        refresher.complete();
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    })
  }

  //前往详情页面
  goDegtail(item) {
    this.navCtrl.push("KxNewsDegtailPage", { id: item.id, fromname: "领保快讯" });
  }

  //上拉加载
  doInfinite(infiniteScroll) {
    if (this.hasmore) {
      this.page++;
      this.loaddata(false, null, infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }

  //下拉刷新
  doRefresh(refresher) {
    this.items = [];
    this.page = 1;
    this.loaddata(false, refresher, null);
  }

}
