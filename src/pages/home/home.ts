import { Component, ViewChild } from '@angular/core';
import {NavController, IonicPage, AlertController} from 'ionic-angular';
import { Device } from "@ionic-native/device";
import { HomeService } from "../../providers/HomeService";
import {UserService} from "../../providers/UserService";
import {BadgeSinhService} from "../../providers/BadgeSinhService";
import {NativeService} from "../../providers/NativeService";
import {GlobalData} from "../../providers/GlobalData";
import {APP_VERSION} from "../../providers/Constants";
import { Storage } from '@ionic/storage';
/**
 * 首页页面
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  serial;
  items: any;
  chinaItems: any;
  len;
  page = 1;
  pagesize = 20;
  hasmore = true;
  cindex = 1;
  params = {Page: 1,authority:0};
  List: any;
  @ViewChild('ionSlides') slides;

  currentNo;
  appSystem='Android';
  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              public storage: Storage,
              public HomeService: HomeService,public userService: UserService,public device: Device,public  badge:BadgeSinhService,public nativeService:NativeService,   private globalData: GlobalData,) {
  }

  ionViewDidEnter() {
    if(this.items){
      this.slides.startAutoplay();
      this.slides.autoplayDisableOnInteraction = false;
    }
  }

  // 刷新用户信息
  refreshUserInfo() {
    this.chinaItems=[
      {title:" 中央环境保护督察“回头看” ",date:"2018-06-05 "},
      {title:" 信阳市卫计监督局“双随机一公开”检查情况第二阶段公示一览表 ” ",date:"2018-05-29 "},
      {title:" 群众办事百项堵点疏解行动启动 （第二季）  ” ",date:"2018-05-28 "},
      {title:" 信政督字〔2018〕39号 关于做好国办督查激励通报有关精神宣传的督查通知  ” ",date:"2018-05-27 "},
      {title:" 信阳市卫计监督局“双随机一公开”检查情况第一阶段公示一览表  ” ",date:"2018-05-26 "},
      {title:" 信阳市基本公共卫生服务项目承担机构信息首批公示名单  ” ",date:"2018-05-22 "},
      {title:"  信阳市卫计委机关党委演讲比赛通知  ” ",date:"2018-05-20 "},
      {title:" 信卫办[2017]415号 信阳市卫生和计划生育委员会关于印发《2017年全市职业病防治项目实施方案》的通知  ” ",date:"2018-03-29 "},
      {title:" 信阳市各县区上报打击“两非”案件查处情况统计表 ” ",date:"2018-01-29 "},
    ];
  }

  ionViewDidLoad() {
    this.doRefresh(null);
    this.refreshUserInfo();
    this.checkUpdate();
  }

  //页面离开时停止自动播放
  ionViewDidLeave() {
    this.slides.stopAutoplay();
  }
  //刷新未读消息数
  getMessage(){
    this.userService.isLogin().then(isLogin => {
      if (isLogin) {
        this.userService.getLoginInfo().then(userInfo => {
          this.userService.getNum({ IEMI:  this.globalData.serial + '',authority:userInfo.authority}).subscribe(data => {
            let obj: any = data;
            this.badge.setBadge(parseInt(obj.icNum)+parseInt(obj.inNum)+parseInt(obj.reNum));
          })
        });
      }else {
        this.userService.getNum({ IEMI:  this.globalData.serial + '',authority:0}).subscribe(data => {
          let obj: any = data;
          this.badge.setBadge(parseInt(obj.icNum)+parseInt(obj.inNum)+parseInt(obj.reNum));
        })
      }
    });
  }

  //前往详情页面
  goDegtail(item) {
    this.navCtrl.push("NewsDegtailPage", { id: item.id, fromname: "通知公告" });
  }

  //下拉刷新
  doRefresh(refresher) {
    this.items=[
      {savePath:"assets/img/home/banner1.jpg",title:"信阳市卫计委举办2018年健康教育专业技能培训班"},
      {savePath:"assets/img/home/banner2.jpg",title:"河南省第五批卫计监督机构规范化建设启动暨推"},
      {savePath:"assets/img/home/banner3.jpg",title:"信阳市政府召开2018年食品安全风险监测结果会商"},
      {savePath:"assets/img/home/banner4.jpg",title:"河南省卫计委高度评价平桥区卫计监督机构规范"},
    ];
    // this.params.Page=1;
    // this.HomeService.getgetTfRollingImg().subscribe(data => {
    //   this.items = data;
    //   this.len = this.items.length;
    //   if(refresher){
    //     this.HomeService.getHotNewsList(this.params).subscribe(data => {
    //       this.chinaItems = data;
    //       if (refresher) {
    //         refresher.complete();
    //       }
    //     });
    //   }
    // });
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

  private loaddata(isFirstload, refresher: any, infiniteScroll: any) {

    this.HomeService.getHotNewsList(this.params).subscribe(data => {
      if (refresher || isFirstload) {
        this.chinaItems = data;
      }
      if (refresher)
        refresher.complete();
      if (infiniteScroll) {
        this.chinaItems = this.chinaItems.concat(data);
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
  goedu(){
    this.navCtrl.push('PublicityEduPage');
    //window.open('http://www.bjcpedu.cn/');
  }

  checkUpdate(){

    this.storage.get('update').then(update => {
      if(update==null){
        this.globalData.update=true;
      }else {
        this.globalData.update = update;
      }
      if(this.globalData.update){
        this.currentNo=APP_VERSION;
        if(this.nativeService.isAndroid()){
          this.appSystem='Android';
        }
        if(this.nativeService.isIos()){
          this.appSystem='Ios';
        }
        if(this.appSystem=='Android'){
          this.nativeService.showLoading('检测更新中');
          this.userService.getAppVersion({appSystem:this.appSystem}).subscribe(data=>{
            let obj:any=data;
            this.nativeService.hideLoading();
            if(this.currentNo!=obj.version){
              this.alertCtrl.create({
                title: '发现新版本,是否立即升级？',
                subTitle: obj.infos,
                enableBackdropDismiss: false,
                buttons: [{ text: '取消',
                  handler: () => {
                    this.storage.set('update',false);
                    this.globalData.update=false;
                    this.nativeService.showToast('如果您想要继续更新,请前往版本检测');
                  }
                },
                  {
                    text: '确定',
                    handler: () => {
                      window.open(obj.url);
                    }
                  }
                ]
              }).present();
            }
          })
        }
      }
    })

  }

}
