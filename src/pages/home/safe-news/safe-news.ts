import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from "../../../providers/HomeService";
import { Device } from "@ionic-native/device";
/**
 * 安全提示页面
 */
@IonicPage()
@Component({
  selector: 'page-safe-news',
  templateUrl: 'safe-news.html',
})
export class SafeNewsPage {

  params = { version: "3", Page: 1 };
  items: any;
  page = 1;
  pagesize = 20;
  hasmore = true;
  cindex = 1;
  List: any;
  serial;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public HomeService: HomeService,    public device: Device
  ) {
    this.params.Page = 1;
    this.params.version = "3";
  }

  ionViewDidLoad() {
    if (this.device.uuid) {
      this.serial = this.device.uuid;
    } else {
      this.serial = '123456';
    }
    this.loaddata(true, null, null);
  }

  sec(cindex) {
    this.params.Page = 1;
    this.cindex = cindex;
    switch (cindex) {
      case 1: this.params.version = "3"; break;
      case 2: this.params.version = "4"; break;
    }
    this.items = [];
    this.loaddata(true, null, null)
  }

  private loaddata(isFirstload, refresher: any, infiniteScroll: any) {
    this.HomeService.getSafeNewsList(this.params).subscribe(data => {
      if (refresher || isFirstload) {
        this.items = data;
      }
      this.readedList(data);
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

  //前往详情页面
  goDegtail(item) {
    this.navCtrl.push("NewsDegtailPage", { id: item.id, fromname: "安全提示" });
  }
  readedList(data){
    if(data.message){
      return;
    }
    let msgList=[];
    if(data){
      for(let i in data){
        msgList.push(data[i].id);
      }
      this.HomeService.updateSafeReadList({idList:msgList,IEMI:this.serial}).subscribe(data=>{

      })
    }
  }
}
