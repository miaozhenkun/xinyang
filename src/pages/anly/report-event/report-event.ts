import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController } from 'ionic-angular';
import { NativeService } from "../../../providers/NativeService";
import { FileService } from '../../../providers/FileService';
import { ReportService } from '../../../providers/ReportService';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Events } from 'ionic-angular/util/events';
import { UserService } from '../../../providers/UserService';

/**
 * 事件上报
 */
@IonicPage({
  segment: 'report-event/:id'
})
@Component({
  selector: 'page-report-event',
  templateUrl: 'report-event.html',
})
export class ReportEventPage {

  // 是否为编辑
  private isEdit: boolean = false;

  // 事件上报对象
  private params: any = {
    tfType: null,// 事件性质(必填)*
    tfNote: null,// 事件详情
    country: null,// 国家
    position: null,// 定位坐标(谷歌坐标)
    tfAddress: null,// 定位地址
    addressDetails: null,// 手动输入地址
    imgName: null,// 图片名称集合
  };
  private ishurt=true;
  private isdead=false;
  private ismon=false;
  private isother=false;
  // 选择的文件
  private files: Array<object> = [];

  // 是否允许进入页面
  ionViewCanEnter() {
    return this.userService.isLogin(true);
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nativeService: NativeService,
    public actionSheetCtrl: ActionSheetController,
    public fileService: FileService,
    public reportService: ReportService,
    public events: Events,
    public userService: UserService
  ) { }


  // 页面加载完成触发
  ionViewDidLoad() {
    // 获取传入对象
    let reportId = this.navParams.get('id');
    if (reportId) {// 编辑
      this.isEdit = true;
      this.reportService.getReportById(reportId).subscribe(data => {
        // 对象赋值
        Object.assign(this.params, data);
        // 转换附件路径
        this.transImgUrl2Files(this.params.imgUrl);
        // 删除无用对象(会影响签名)
        delete this.params.imgUrl;
      });
    } else {// 新增
      this.isEdit = false;
      this.params = {
        addressDetails: null,// 手动输入地址
        country: null,// 国家
        imgName: null,// 图片名称集合
        position: null,// 定位坐标(谷歌坐标)
        tfAddress: null,// 定位地址
        tfNote: null,// 事件详情
        tfType: null,// 事件性质(必填)*
      };

    }
    this.params.tfType = this.params.tfType || '受伤';
    // 刷新定位
    this.refreshPosition();
  }

  // 将imgurl转换为files
  transImgUrl2Files(imgUrl) {
    this.files = [];
    if (!imgUrl) return;
    for (let i in imgUrl) {
      this.files.push(this.fileService.changeImgUrlToFile(imgUrl[i]));
    }
  }

  // 打开文件选择
  openAddFiles() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择上传内容',
      buttons: [
        {
          text: '照片',
          handler: () => this.choosePhoto()
        }, {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  //  上报
  upload() {
    this.params.tfType=this.ishurt?'受伤、':"";
    if(this.isdead){
      this.params.tfType=this.params.tfType+'死亡、';
    }
    if(this.ismon){
      this.params.tfType=this.params.tfType+'财产损失、';
    }
    if(this.isother){
      this.params.tfType=this.params.tfType+'其它';
    }
    if( this.params.tfType!=""){
      this.params.imgName = this.getParamsImgByFiles();
      this.reportService.saveReport(this.params)
        .subscribe(data => {
          this.nativeService.showToast('上报成功');
          // 更新广播
          if (this.isEdit) {
            this.events.publish('report:update', this.params.id, Date.now())
          }
          this.navCtrl.pop();
          // 国家+地址+事件类型，请尽快查看并处理
          // this.userService.jiguangPush({msg:this.params.country+this.params.addressDetails+this.params.tfType+"，请尽快查看并处理"}).subscribe(data=>{
          //   this.navCtrl.pop();
          // })

        });
    }else {
      this.nativeService.showToast('请选择事件性质');
    }

  }

  // 根据选择的文件获取待上传的文件参数值
  getParamsImgByFiles() {
    let ret = '';
    let filesLength = this.files.length;
    for (let i in this.files) {
      let file: any = this.files[i];
      ret += file.name;
      if (i != '' + (filesLength - 1)) {
        ret += ',';
      }
    }
    return ret;
  }

  // 刷新当前位置
  refreshPosition() {
    this.nativeService.getUserGps().subscribe(
      data => {
        this.params.position = data.latitude + ',' + data.longitude;
        this.params.tfAddress = data.addr;
        this.params.country = data.country;
      },
      err => {
        this.nativeService.showToast('定位失败');
      });
  }

  // 选择照片
  choosePhoto() {
    this.fileService.getPhotoAndUpload().then((data: any) => {
      this.addFile(this.fileService.changeImgUrlToFile(data.filePath));
    });
  }



  // 添加一个文件
  addFile(file) {
    this.files.push(file);
  }

  // 移除一个文件
  removeFile(idx) {
    this.files.splice(idx, 1)
  }

}
