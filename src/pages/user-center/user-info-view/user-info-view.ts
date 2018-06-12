import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController } from 'ionic-angular';
import { UserService } from "../../../providers/UserService";
import { ImgService } from "../../../providers/ImgService";
import { NativeService } from "../../../providers/NativeService";
import { StorageKVService } from "../../../providers/StorageKVService";
import { ChangeDetectorRef } from '@angular/core';
import { APP_SERVE_URL } from "../../../providers/Constants";

/**
 * 个人信息查看
 */
@IonicPage()
@Component({
  selector: 'page-user-info-view',
  templateUrl: 'user-info-view.html',
})
export class UserInfoViewPage {

  private KEY_USERINFO = "userinfo";
  userInfo: { [key: string]: any }

  public params = {
    email: '',
    idnumber:'',
    passportnum: '',
    phoneNoOut: '',
    phonenum: '',
    realname: '',
    sex: '',
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private userService: UserService,
    private imgSer: ImgService,
    private nativeService: NativeService,
    private kv: StorageKVService,
    public cd: ChangeDetectorRef) {

  }

  ionViewDidLoad() {
    this.userInfo = this.navParams.data.userInfo;
    this.params.email = this.userInfo.email;
    this.params. idnumber=this.userInfo.IDnumber;
    this.params.phoneNoOut = this.userInfo.phoneNoOut;
    this.params.phonenum = this.userInfo.phonenum;
    this.params.passportnum = this.userInfo.passportnum;
    this.params.realname = this.userInfo.realname;

  }

  // 选择性别
  sexActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择性别',
      buttons: [
        {
          text: '男',
          role: 'destructive',
          handler: () => {
            this.userInfo.sex = '男';
          }
        }, {
          text: '女',
          handler: () => {
            this.userInfo.sex = '女';
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  // 初始化上传图片的服务
  initImgSer() {
    this.imgSer.upload.url = APP_SERVE_URL + 'user/userController/uploadIcon'; // 上传图片的url，如果同默认配置的url一致，那无须再设置
    this.imgSer.upload.success = (data) => {
      this.nativeService.showToast('上传成功');
      this.userInfo.avatar = JSON.parse(data.response).data;
      this.cd.detectChanges();
      this.kv.set(this.KEY_USERINFO, this.userInfo).then(() => {
      })
    };
    this.imgSer.upload.error = (err) => {
      this.nativeService.showToast('上传失败');
    };
    this.imgSer.showPicActionSheet();
  }

  // 保存
  save() {
    this.params.sex = this.userInfo.sex;
    this.userService.changeInfo(this.params).subscribe(data => {
      this.userInfo.email = this.params.email;
      this.userInfo.IDnumber=this.params.idnumber;
      this.params.phoneNoOut = this.userInfo.phoneNoOut = this.params.phoneNoOut;
      this.userInfo.phonenum = this.params.phonenum;
      this.userInfo.passportnum = this.params.passportnum;
      this.userInfo.realname = this.params.realname;
      this.nativeService.showToast('个人资料修改成功');
      this.kv.set(this.KEY_USERINFO, this.userInfo).then(() => {
      })
    });
  }

}
