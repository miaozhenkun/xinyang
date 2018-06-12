import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from "../../../providers/HomeService";

/**
 * 法律法规
 */
@IonicPage()
@Component({
  selector: 'page-lawsregulation',
  templateUrl: 'lawsregulation.html',
})
export class LawsregulationPage {

  items: any;
  dataList: any;
  page = 1;
  pagesize = 20;
  hasmore = true;
  params = { countryName: "", Page: 1 };
  public select = 0;
  List: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public HomeService: HomeService
  ) { }

  onInput() {
    this.params.Page = 1;
    if (this.params.countryName.trim() == '') {
      return;
    }
    this.loaddata(true, null, null);
  }

  private loaddata(isFirstload, refresher: any, infiniteScroll: any) {

    this.HomeService.getLawsList(this.params).subscribe(data => {
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
      for (var i in this.items) {
        this.items[i].isSelect = false;
      }

      if (this.items.length > 0) {
        this.HomeService.getLawsSecList({ countryName: this.params.countryName, lawType: this.items[0].law_type }).subscribe(data => {
          this.items[0].isSelect = true;
          this.select = 0;
          this.dataList = data;
        }, err => {
          this.dataList = [];
        });
      } else {
        this.dataList = [];
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
    this.navCtrl.push("NewsDegtailPage", { id: item.id, fromname: "法律法规" });
  }

  // //上拉加载
  // doInfinite(infiniteScroll) {
  //   if (this.hasmore) {
  //     this.params.Page++;
  //     this.loaddata(false, null, infiniteScroll);
  //   } else {
  //     infiniteScroll.complete();
  //   }
  // }
  //
  // //下拉刷新
  // doRefresh(refresher) {
  //   this.params.Page = 1;
  //   this.loaddata(false, refresher, null);
  // }

  clickLeft(index, item) {
    if (this.select == index) {
      return;
    } else {
      this.items[index].isSelect = true;
      this.items[this.select].isSelect = false;
      this.select = index;
      this.HomeService.getLawsSecList({ countryName: this.params.countryName, lawType: item.law_type }).subscribe(data => {
        this.dataList = data;
      }, err => {
        this.dataList = [];
      });
    }
  }

}
