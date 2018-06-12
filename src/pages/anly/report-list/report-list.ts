import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BaseListPage } from '../../../providers/BaseListPage';
import { ReportService } from '../../../providers/ReportService';
import { Observable } from "rxjs";
import { Response } from '@angular/http';
import { UserService } from '../../../providers/UserService';

/**
 * 我的上报列表
 */
@IonicPage()
@Component({
  selector: 'page-report-list',
  templateUrl: 'report-list.html',
})
export class ReportListPage extends BaseListPage {
  authority=0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public reportService: ReportService,
    public alertCtrl: AlertController,
    public userService: UserService
  ) {
    super();
  }

  // 是否允许进入页面
  ionViewCanEnter() {
    return this.userService.isLogin(true);
  }

  // 页面加载完成触发
  ionViewDidLoad() {
    this.userService.isLogin().then(isLogin => {
      if (isLogin) {
        this.userService.getLoginInfo().then(userInfo => {
          this.params.authority=userInfo.authority;
          super.initData();
        })
      } else {
        super.initData();
      }
    });
  }

  // 获取数据
  getRemoteList(params: any): Observable<Response> {
    return this.reportService.getMyReports(params);
  }

  // 删除上报数据
  delReport(report, idx) {
    this.alertCtrl.create({
      title: '确认删除?',
      message: '确定删除上报数据？删除后不可撤销。',
      buttons: [
        { text: '取消' },
        {
          text: '确认',
          handler: () => {
            this.reportService.delReportById(report.id).subscribe(data => {
              this.items.splice(idx, 1);
            });
          }
        }
      ]
    }).present();
  }

}
