import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeService} from "../../../providers/HomeService";

@IonicPage()
@Component({
  selector: 'page-relief-agencies',
  templateUrl: 'relief-agencies.html',
})
export class ReliefAgenciesPage {
  List: any;
  params = { type: 1, Page: 1 };
  items: any;
  page = 1;
  pagesize = 20;
  hasmore = true;
  cindex = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams,public HomeService:HomeService) {

  }

  ionViewDidLoad() {
    this.loaddata(true, null, null);
  }

  sec(cindex) {
    this.cindex = cindex;
    switch (cindex) {
      case 1: this.params.type = 1; break;
      case 2: this.params.type = 3; break;
      case 3: this.params.type = 4; break;
    }
    this.params.Page=1;
    this.items = null;
    this.loaddata(true, null, null);
  }



  private loaddata(isFirstload, refresher: any, infiniteScroll: any) {

    this.HomeService.getTfIntenareliefList(this.params)
      .subscribe(data => {
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
    if(this.params.type){
      this.loaddata(false, refresher, null);
    }
  }

  // 详情
  goDegtail(item) {
    this.navCtrl.push('ReliefListDegtailPage',{id:item.id});
  }

}
