import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from "../../../providers/HomeService";
import { Device } from "@ionic-native/device";
import {UserService} from "../../../providers/UserService";

/**
 * 报告
 */
@IonicPage()
@Component({
  selector: 'page-report-news',
  templateUrl: 'report-news.html',
})
export class ReportNewsPage {

  serial;
  List: any;
  params = { type: 1, Page: 1,authority:0 };
  items: any;
  page = 1;
  pagesize = 20;
  hasmore = true;
  cindex = 1;
  paramslaw = { countryName: "", Page: 1 };
  public select = 0;
  dataList: any;
  // 用户信息
  user: any = {};
  // 是否登录
  isLogin: Boolean = false;
  permisson=0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public HomeService: HomeService,
    public device: Device,  private userService: UserService,
  ) {
    this.params.Page = 1;
    this.params.type = 3;
  }

  ionViewDidLoad() {
    if (this.device.uuid) {
      this.serial = this.device.uuid;
    } else {
      this.serial = '123456';
    }
    this.loaddata(true, null, null);
  }
  // 每次页面进入
  ionViewWillEnter() {
    this.refreshUserInfo();
  }
  // 刷新用户信息
  refreshUserInfo() {
    this.userService.isLogin().then(isLogin => {
      this.isLogin = isLogin;
      if (isLogin) {
        this.userService.getLoginInfo().then(userInfo => {
          this.permisson=userInfo.authority;
          this.params.authority=userInfo.authority;
          //this.user = userInfo;
        });
      }
    });
  }


  sec(cindex) {
    this.cindex = cindex;
    switch (cindex) {
      case 1: this.params.type = 3; break;
      case 2: this.params.type = 2; break;
      case 3: this.params.type = 6; break;
      case 4: this.params.type = 12; break;
      case 5: this.params.type = null; break;
    }
    this.params.Page=1;
    this.items = null;
    if(this.params.type){
      this.loaddata(true, null, null);
    }

  }

  private loaddata(isFirstload, refresher: any, infiniteScroll: any) {

    this.HomeService.getReportNewsList(this.params)
      .subscribe(data => {
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
    this.items = null;
    this.params.Page = 1;
    if(this.params.type){
      this.loaddata(false, refresher, null);
    }else {
      refresher.complete();
    }
  }

  // 详情
  goDegtail(item) {
    this.navCtrl.push('ReportDegtailPage',{id:item.id});
    // this.HomeService.getReportNewsDegtail({ id: item.id }).subscribe(data => {
    //   this.HomeService.updateReportRead({ id: item.id, IEMI: this.serial }).subscribe(data => {
    //   });
    //   window.open(data[0].content);
    // })
  }
  onInput() {
    this.paramslaw.Page = 1;
    if (this.paramslaw.countryName.trim() == '') {
      return;
    }
    this.loadLawData(true, null, null);
  }

  private loadLawData(isFirstload, refresher: any, infiniteScroll: any) {

    this.HomeService.getLawsList(this.paramslaw).subscribe(data => {
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
        this.HomeService.getLawsSecList({ countryName: this.paramslaw.countryName, lawType: this.items[0].law_type }).subscribe(data => {
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
  golawDegtail(item) {
    this.navCtrl.push("NewsDegtailPage", { id: item.id, fromname: "法律法规" });
  }
  clickLeft(index, item) {
    if (this.select == index) {
      return;
    } else {
      this.items[index].isSelect = true;
      this.items[this.select].isSelect = false;
      this.select = index;
      this.HomeService.getLawsSecList({ countryName: this.paramslaw.countryName, lawType: item.law_type }).subscribe(data => {
        this.dataList = data;
      }, err => {
        this.dataList = [];
      });
    }
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
      this.HomeService.updateReportReadList({idList:msgList,IEMI:this.serial,authority:this.params.authority}).subscribe(data=>{

      })
    }
  }

}
