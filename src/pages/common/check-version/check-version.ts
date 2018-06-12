import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {NativeService} from "../../../providers/NativeService";
import {UserService} from "../../../providers/UserService";
import { File} from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import {APP_VERSION} from "../../../providers/Constants";
@IonicPage()
@Component({
  selector: 'page-check-version',
  templateUrl: 'check-version.html',
})
export class CheckVersionPage {
  currentNo;
  appSystem='Android';
  alertone;
  constructor(public navCtrl: NavController,    public fileTransfer: FileTransfer, public navParams: NavParams,public nativeService:NativeService,public userService:UserService,private alertCtrl: AlertController,private file: File) {

  }

  ionViewDidLoad() {
        this.currentNo=APP_VERSION;
        if(this.nativeService.isAndroid()){
          this.appSystem='Android';
        }
        if(this.nativeService.isIos()){
          this.appSystem='Ios';
        }
  }
  ionViewWillEnter() {
    if(this.appSystem=='Android'){
      this.nativeService.showLoading('检测更新中');
      this.userService.getAppVersion({appSystem:this.appSystem}).subscribe(data=>{
        let obj:any=data;
        console.log(obj);
        this.nativeService.hideLoading();
        if(this.currentNo!=obj.version){
          this.alertCtrl.create({
            title: '发现新版本,是否立即升级？',
            subTitle: obj.infos,
            enableBackdropDismiss: false,
            buttons: [{ text: '取消' },
              {
                text: '确定',
                handler: () => {
                  window.open(obj.url);
                  // this.downloadApp(obj);
                }
              }
            ]
          }).present();
        }
      })
    }
  }


  /**
   * 下载安装app
   */
  downloadApp(obj): void {
   // obj.url="http://113.208.113.12:8777/VaccinationServer/download/software/vaccine.apk";

    if (this.nativeService.isIos()) {//ios打开网页下载
     // this.openUrlByBrowser(APP_DOWNLOAD);
      window.open(obj.url);
    }
    if (this.nativeService.isAndroid()) {//android本地下载
      //显示下载进度
      let alert = this.alertCtrl.create({
        title: '下载进度：0%',
        enableBackdropDismiss: false,
        buttons: ['后台下载']
      });
      alert.present();
      const fileTransfer: FileTransferObject = this.fileTransfer.create();
      const apk = this.file.externalRootDirectory + 'android.apk'; //apk保存的目录
      //下载并安装apk
      fileTransfer.download(obj.url, apk).then(() => {
        window['install'].install(apk.replace('file://', ''));
      }, err => {
       // alert.dismiss();
        this.nativeService.showToast('android app 本地升级失败');
        this.alertCtrl.create({
          title: '前往网页下载',
          subTitle: '本地升级失败',
          buttons: [
            {
              text: '确定',
              handler: () => {
                window.open(obj.url);
              }
            }
          ]
        }).present();
      });
      //更新下载进度
      fileTransfer.onProgress((event: ProgressEvent) => {
        let num = Math.floor(event.loaded / event.total * 100);
        if (num === 100) {
          alert.dismiss();
        } else {
          let title = document.getElementsByClassName('alert-title')[0];
          title && (title.innerHTML = '下载进度：' + num + '%');
        }
      });
    }
  }


}
