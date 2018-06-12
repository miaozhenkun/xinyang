import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../../providers/UserService";

/**
 * 意见反馈列表
 */
@IonicPage()
@Component({
  selector: 'page-feed-back-list',
  templateUrl: 'feed-back-list.html',
})
export class FeedBackListPage {

  params = { Page: 1 };
  items: any;
  page = 1;
  pagesize = 20;
  hasmore = true;
  cindex = 1;
  List: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService) {

  }

  ionViewDidLoad() {
    this.loaddata(true, null, null);
  }

  private loaddata(isFirstload, refresher: any, infiniteScroll: any) {
    this.userService.feedBackList(this.params).subscribe(data => {
      let data1: any = data;
      data = data1.data;
      if (refresher || isFirstload) {
        this.items = data;
      }
      if (refresher)
        refresher.complete();
      if (infiniteScroll) {
        this.items = this.items.concat(data);
        infiniteScroll.complete();
      }
      this.List = data1;
      if (this.List.length < this.pagesize) {
        this.hasmore = false;
      } else {
        this.hasmore = true;
      }
      console.log(data);
    }, err => {
      if (refresher) {
        refresher.complete();
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    })
  }

  //上拉加载
  doInfinite(infiniteScroll) {
    if (this.hasmore) {
      this.params.Page++;
      this.loaddata(false, null, infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }

  //下拉刷新
  doRefresh(refresher) {
    this.items = [];
    this.params.Page = 1;
    this.loaddata(false, refresher, null);
  }

  //返回上一页
  goBack() {
    this.navCtrl.pop();
  }

  //前往详情页面
  goDegtail(item) {
    this.navCtrl.push("NewsDegtailPage", { id: item.id, fromname: "安全提示" });
  }

}
