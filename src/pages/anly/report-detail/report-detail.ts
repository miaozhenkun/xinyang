import { Component } from '@angular/core';
import { IonicPage, NavParams, Events } from 'ionic-angular';
import { ReportService } from '../../../providers/ReportService';
import { FileService } from '../../../providers/FileService';
import { UserService } from '../../../providers/UserService';

/**
 * 上报详情
 */
@IonicPage({
  segment: 'report-detail/:id'
})
@Component({
  selector: 'page-report-detail',
  templateUrl: 'report-detail.html',
})
export class ReportDetailPage {

  // 数据唯一标识
  private id: string;
  // 数据对象
  private item: any;
  // 文件
  private files: any = [];
  authority;
  userinfo;
  // 是否允许进入页面
  ionViewCanEnter() {
    return this.userService.isLogin(true);
  }

  constructor(
    public navParams: NavParams,
    public reportService: ReportService,
    public fileService: FileService,
    public events: Events,
    public userService: UserService
  ) { }

  // 页面加载完成触发
  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.authority=this.navParams.get('authority');
    console.log( this.authority);
    this.refreshData();
    // 订阅数据更新
    this.events.subscribe('report:update', (id, time) => {
      if (this.id == id) {
        this.refreshData();
      }
    })
  }

  // 刷新页面数据
  refreshData() {
    // 加载详情
    if (this.id) {
      this.reportService.getReportById(this.id)
        .subscribe((data: any) => {
          this.item = data;
          this.files = [];
          this.changeImgUrl(data.imgUrl);
          if(this.authority==2){
            this.reportService.personReport({userName:this.item.username}).subscribe((data:any)=>{
              this.userinfo=data;
              console.log(data);
            })
          }
        });
    }
  }

  // 转换imgUrl
  changeImgUrl(imgUrl) {
    if (!imgUrl) {
      return;
    }
    for (let i in imgUrl) {
      this.files.push(this.fileService.changeImgUrlToFile(imgUrl[i]));
    }

  }

}
