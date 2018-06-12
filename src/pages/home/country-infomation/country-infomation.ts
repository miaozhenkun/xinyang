import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from "../../../providers/HomeService";

/**
 * 国别信息
 */
@IonicPage()
@Component({
  selector: 'page-country-infomation',
  templateUrl: 'country-infomation.html',
})
export class CountryInfomationPage {

  items: any;
  page = 1;
  pagesize = 20;
  hasmore = true;
  cindex = 1;
  params = { zone: "yz", searchTxt: "", Page: 1 };
  List: any;
  isSearch = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public HomeService: HomeService
  ) { }

  ionViewDidLoad() {
    this.params.Page = 1;
    this.params.zone = "yz";
    this.loaddata(true, null, null);
  }

  sec(cindex) {
    this.cindex = cindex;
    switch (cindex) {
      case 1: this.params.zone = "yz"; break;
      case 2: this.params.zone = "oz"; break;
      case 3: this.params.zone = "mz"; break;
      case 4: this.params.zone = "dyz"; break;
      case 5: this.params.zone = "fz"; break;
    }
    this.items = [];
    this.loaddata(true, null, null)
  }

  // 查询
  onInput() {
    this.params.zone = "";
    this.params.Page = 1;
    if (this.params.searchTxt.trim() == '') {
      return;
    }
    this.isSearch = true;
    this.loaddata(true, null, null);
  }

  // 加载数据
  private loaddata(isFirstload, refresher: any, infiniteScroll: any) {

    this.HomeService.getCountryList(this.params)
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

  //前往详情页面
  goDegtail(item) {
    this.navCtrl.push("NewsDegtailPage", { id: item.name, fromname: "国别信息" });
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
    this.params.Page = 1;
    this.loaddata(false, refresher, null);
  }

  goConsulate(item) {
    this.navCtrl.push("ConsulateListPage", { country: item.name });
  }

  goChCap(item) {
    this.navCtrl.push("ChCapitalinsPage", { country: item.name });
  }

}
