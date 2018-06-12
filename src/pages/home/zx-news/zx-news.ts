import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from "../../../providers/HomeService";
import {UserService} from "../../../providers/UserService";
import {GlobalData} from "../../../providers/GlobalData";

/**
 * 资讯列表
 */
@IonicPage()
@Component({
  selector: 'page-zx-news',
  templateUrl: 'zx-news.html',
})
export class ZxNewsPage {
  items: any;
  title: any="工作动态";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public HomeService: HomeService,public userService: UserService,private globalData: GlobalData
  ) { }

  ionViewDidLoad() {
    switch (this.navParams.data.fromname) {
      case "工作动态":this.title="工作动态" ;break;
      case "行业动态":this.title="行业动态" ;break;
      case "疾病预防":this.title="疾病预防" ;break;
      case "政策法规":this.title="政策法规" ;break;
      case "健康教育":this.title="健康教育" ;break;
      case "健康咨询":this.title="健康咨询" ;break;
      case "健康档案":this.title="健康档案" ;break;
      case "卫计委要闻":this.title="卫计委要闻" ;break;
    }

    this.loaddata();
  }

  private loaddata() {
    this.items=[
      {title:"信阳市政府召开2018年食品安全风险监测结果会商联席工作会",date:"2018-06-10"},
      {title:"中共信阳市卫生和计划生育委员会召开机关党委换届选举第一次代表大会",date:"2018-06-06"},
      {title:"河南省第五批卫计监督机构规范化建设启动暨推进会在信阳召开",date:"2018-06-06"},
      {title:"信阳市卫计委举办2018年健康教育专业技能培训班",date:"2018-06-06"},
      {title:"河南省卫计委高度评价平桥区卫计监督机构规范化建设工作",date:"2018-06-06"},
      {title:"河南省信阳市与广西省壮族自治区百色市卫生计生监督机构合作共建举行签约仪式",date:"2018-06-06"},
      {title:"信阳市卫计委召开健康扶贫集中总攻动员大会",date:"2018-06-06"},
      {title:"河南省人口和计划生育工作领导小组办公室派遣工作组深入信阳市开展计划生育工作调研",date:"2018-06-06"},
      {title:"信阳市中医院举办庆祝“5•12国际护士节”文艺汇演",date:"2018-05-11"},
      {title:"信阳市卫计监督局召开2018年卫计监督信息管理工作会议",date:"2018-05-08"},
      {title:"信阳市卫计委召开领导班子集中学法会",date:"2018-05-01"},
      {title:" 信阳市卫生和计划生育委员会开展“亮剑─春雷行动”“医疗美容专项行动”等工作督导检查",date:"2018-04-26"},
      {title:"信阳市卫计委召开2018年度全国卫生专业技术资格暨护士执业资格考试工作会",date:"2018-04-06"},
    ];
  }

  //前往详情页面
  goDegtail(item) {
      this.navCtrl.push("NewsDegtailPage", { id: item.id, fromname: "工作动态" });
  }

}
