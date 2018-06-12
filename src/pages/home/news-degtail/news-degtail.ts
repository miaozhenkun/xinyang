import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import { HomeService } from "../../../providers/HomeService";


/**
 * 新闻详情页面
 */
@IonicPage()
@Component({
  selector: 'page-news-degtail',
  templateUrl: 'news-degtail.html',
})
export class NewsDegtailPage {

  srcUrl: any;
  id;
  time
  title;
  item: any;
  items: any;
  country;
  private timer;
  coverlen;
  serial;
  searchTxt;
  seria=0;

  @ViewChild(Content) content: Content;
  @ViewChild('keycode') keycode;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public HomeService: HomeService,
  ) { }

  ionViewDidLoad() {
    this.time = new Date().getTime();
  }

  ionViewDidEnter() {
    this.id = this.navParams.data.id;
    switch (this.navParams.data.fromname) {
      case "通知公告":
        this.title = "通知公告";
        this.item={title:"群众办事百项堵点疏解行动第二季启动",content:"反复提交材料、多个部门间跑断腿、开办企业费时费力。。。。提起找政府办事，很多人第一反应就是三个字：烦！累！急！4月份，国家发展改革委、新华社、中国政府网联合开展了第一季“群众办事百项堵点疏解行动”，社会反响强烈，短短十天时间内，16万人参与投票。投票选出的20项堵点问题已发至各地限期解决。截至目前，31个省（区、市）累计解决本地堵点事项260余个，平均每地已解决完成8项堵点问题，问题解决情况已同步上线展示。\n" +
          "\n" +
          "        第二季来了！\n" +
          "\n" +
          "        5月25日起，国家发展改革委、新华社、中国政府网联合中国人民银行、国家税务总局、国家市场监督管理总局发起第二季堵点问题征集活动，聚焦商事服务领域办事堵点问题。请结合自身所遇到的涉及营业执照、纳税证明等方面的“奇葩证明”，以及为开证明往返多地的经历填写问卷。所征集的信息经大数据分析后，我们将选择群众反映最强烈的20个“堵点”问题，推动有关地方、部门限时解决。"};
        break;
      case "工作动态":
        this.title = "工作动态";
        this.item={title:"信阳市政府召开2018年食品安全风险监测结果会商联席工作会",content:" 5月30日下午，信阳市政府召开2018年食品安全风险监测结果会商联席工作会议，对当前全市食品安全隐患进行认真分析、总结，及时沟通存在的风险点和问题，明确下一步食品安全监管和监测工作重点，为食品安全监管工作提供依据和目标。信阳市卫计委、市食药监管理局、市环保局、市农业局、市畜牧局、市质监局、市工商局、市市场发展中心、市疾控中心、市卫计监督局等各有关单位分管领导和业务科室负责人参加了会议。\n" +
          "\n" +
          "    信阳市政府食安办食品安全协调督查科科长陆荣赫代表市政府食安办副主任张玉红就食品安全风险监测结果会商联席工作提出具体要求，他说：要构建好、保持好食品安全风险监测工作的良好格局。要继续加强食品安全风险监测能力建设，不断完善监测网络，建立起以卫计部门为主、各相关部门共同承担的食品安全风险监测体系，保量提质，促进工作效率明显提升；要加强成果应用。食品安全风险监测工作要体现价值、扩大影响，必须对海量监测数据进行深入挖掘和分析评估，及时通报监测结果，为政府决策提供基础数据和科学参考；要及时发现食品安全风险隐患，第一时间提出针对性措施，积极回应社会关切问题，充分体现出食品风险监测工作的前瞻性、预警性和导向性作用，为稽查执法提出防控建议，有效防控系统性、区域性食品安全事件的发生。（通讯员 郭海平）\n" +
          "\n"};
        break;
      case "中资机构":
        this.title = "机构详情";
        this.HomeService.getChcapitalDegtail({ id: this.id }).subscribe(data => {
          this.item = data[0];
        });
        break;
      case "安全提示":
        this.title = "安全提示";
        this.HomeService.getSafeNewsDegtail({ id: this.id }).subscribe(data => {
          this.item = data[0];
        });
        break;
      case "资讯":
        this.title = "资讯";
        this.HomeService.getZxNewsDegtail({ id: this.id }).subscribe(data => {
          this.item = data[0];
          this.items = this.item.content.split("-.-");
          this.coverlen = this.item.cover.length;
        });
        break;
      case "国别信息":
        this.title = "国家详情";
        this.HomeService.getCountryDegtail({ country: this.id }).subscribe(data => {
          this.item = data[0];
          this.time = new Date().getTime() - (data[0].timeLag * 60 * 1000);
          this.timer = setInterval(() => {
            this.time = new Date().getTime() + (data[0].timeLag * 60 * 1000);
          }, 1000);
        });
        this.HomeService.getCountryDegtailSec({ country: this.id }).subscribe(data => {
          this.items = data;
        });
        break;
      case "使领馆":
        this.title = "使领馆";
        this.HomeService.getConsulateDegtail({ id: this.id }).subscribe(data => {
          this.items = data;
          this.country = data[0];
        });
        break;
      case "法律法规":
        this.title = "法律法规";
        this.HomeService.getLawsDegtail({ id: this.id }).subscribe(data => {
          this.srcUrl = data[0].cont;
        });
        break;
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  // 查关键字询
  onInput() {
    if (this.searchTxt.trim() == '') {
      return;
    }
    let origin = document.getElementsByClassName('markdown-body')[0].innerHTML;
    var oP=document.getElementById("box");
    //oP.innerHTML=oP.innerHTML.split(this.searchTxt).join('<span class="highlight" id="keycode">'+this.searchTxt+'</span>')
    // oP.innerHTML = origin.replace(this.searchTxt, '<span name=\'keycode\+this.seria'+'class=\'highlight\'>' + this.searchTxt + '</span>');
    oP.innerHTML = origin.replace(this.searchTxt, '<span name=\'keycode'+this.seria+'\' class=\'highlight\'>'+this.searchTxt+'</span>');
    this.keycode=document.getElementsByName('keycode'+this.seria);
    this.seria++;
    console.log(this.keycode[0]);
    if(this.keycode[0]){
      this.content.scrollTo(0,this.keycode[0].offsetTop,300);
    }

  }

}
