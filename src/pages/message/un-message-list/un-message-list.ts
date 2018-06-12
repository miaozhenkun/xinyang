import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../../providers/UserService";
import { Device } from "@ionic-native/device";
import { HomeService } from "../../../providers/HomeService";

/**
 * 未读消息列表
 */
@IonicPage()
@Component({
  selector: 'page-un-message-list',
  templateUrl: 'un-message-list.html',
})
export class UnMessageListPage {

  title;
  serial;
  items: any;
  page = 1;
  pagesize = 20;
  hasmore = true;
  List: any;
  authority=0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public device: Device,
    public HomeService: HomeService
  ) { }

  ionViewDidLoad() {
    this.page = 1;
    if (this.device.uuid) {
      this.serial = this.device.uuid;
    } else {
      this.serial = '123456';
    }
    switch (this.navParams.data.fromname) {
      case '未读安全提醒':
        this.title = "未读安全提醒";
        this.loadsafedata(true, null, null);
        break;
      case '未读报告':
        this.title = "未读报告";
        this.userService.isLogin().then(isLogin => {
          if(isLogin) {
            this.userService.getLoginInfo().then(userInfo => {
              this.authority=userInfo.authority;
              this.loaddata(true, null, null);
            })
          } else {
            this.authority=0;
            this.loaddata(true, null, null);
          }
        });
        break;
      case '未读快讯':
        this.title = "未读快讯";
        this.userService.isLogin().then(isLogin => {
          if(isLogin) {
            this.userService.getLoginInfo().then(userInfo => {
              this.authority=userInfo.authority;
              this.loadkxdata(true, null, null);
            })
          } else {
            this.authority=0;
            this.loadkxdata(true, null, null);
          }
        })
        break;
    }

  }

  // 加载数据
  private loaddata(isFirstload, refresher: any, infiniteScroll: any) {
    this.userService.unReportList({ Page: this.page, IEMI: this.serial,authority:this.authority })
      .subscribe(data => {
        if (refresher || isFirstload) {
          this.items = data;
        }
        if(this.items.message){
          this.items=[];
          if (refresher){
            refresher.complete();
          }
          if (infiniteScroll) {
            this.items = this.items.concat(data);
            infiniteScroll.complete();
          }
          return;
        }
        if(data){
          this.readedList(data);
        }
        if (refresher)
          refresher.complete();
        if (infiniteScroll) {
          if(this.items.message){
            infiniteScroll.complete();
            return;
          }
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



  private loadkxdata(isFirstload, refresher: any, infiniteScroll: any) {
    this.userService.selectIcReadList({ Page: this.page, IEMI: this.serial,authority:this.authority }).subscribe(data => {
      if (refresher || isFirstload) {
        this.items = data;
      }
      if(this.items.message){
        this.items=[];
        if (refresher){
          refresher.complete();
        }
        if (infiniteScroll) {
          this.items = this.items.concat(data);
          infiniteScroll.complete();
        }
        return;
      }
      if(data){
        this.readedList(data);
      }
      if (refresher){
        refresher.complete();
      }
      if (infiniteScroll) {
        if(this.items.message){
          infiniteScroll.complete();
          return;
        }
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

  private loadsafedata(isFirstload, refresher: any, infiniteScroll: any) {
    this.userService.unSafeReadList({ Page: this.page, IEMI: this.serial }).subscribe(data => {
      if (refresher || isFirstload) {
        this.items = data;
      }
      if(this.items.message){
        this.items=[];
        if (refresher){
          refresher.complete();
        }
        if (infiniteScroll) {
          this.items = this.items.concat(data);
          infiniteScroll.complete();
        }
        return;
      }
      if(data){
        this.readedList(data);
      }
      if (refresher)
        refresher.complete();
      if (infiniteScroll) {
        if(this.items.message){
          infiniteScroll.complete();
          return;
        }
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
    this.page = 1;
    if (this.title == "未读报告") {
          this.navCtrl.push('ReportDegtailPage',{id:item.id});
    } else if (this.title == "未读快讯") {
      this.navCtrl.push("KxNewsDegtailPage", { id: item.id, fromname: "领保快讯" });
    } else {
      this.navCtrl.push("NewsDegtailPage", { id: item.id, fromname: "安全提示" });
    }
  }

  //上拉加载
  doInfinite(infiniteScroll) {
    if (this.hasmore) {
      this.page++;
      if (this.title == "未读快讯") {
        this.loadkxdata(false, null, infiniteScroll);
      } else if (this.title == "未读报告") {
        this.loaddata(false, null, infiniteScroll);
      } else if (this.title == "未读安全提醒") {
        this.loadsafedata(false, null, infiniteScroll);
      }
    } else {
      infiniteScroll.complete();
    }
  }

  //下拉刷新
  doRefresh(refresher) {
    this.items = [];
    this.page = 1;
    if (this.title == "未读快讯") {
      this.loadkxdata(false, refresher, null);
    } else if (this.title == "未读报告") {
      this.loaddata(false, refresher, null);
    } else if (this.title == "未读安全提醒") {
      this.loadsafedata(false, refresher, null);
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
      if (this.title == "未读快讯") {
        this.HomeService.updateKxReadList({idList:msgList,IEMI:this.serial,authority:this.authority}).subscribe(data=>{
        })
      } else if (this.title == "未读报告") {
        this.HomeService.updateReportReadList({idList:msgList,IEMI:this.serial,authority:this.authority}).subscribe(data=>{

        })
      } else if (this.title == "未读安全提醒") {
        this.HomeService.updateSafeReadList({idList:msgList,IEMI:this.serial}).subscribe(data=>{

        })
      }

    }
  }

}
