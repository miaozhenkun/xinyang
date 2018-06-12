import { Injectable } from "@angular/core";
import { ActionSheetController } from "ionic-angular";
import { Camera } from "@ionic-native/camera";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { GlobalData } from "./GlobalData";
import { NativeService } from "./NativeService";

declare var CryptoJS;

/**
 * 照片服务
 */
@Injectable()
export class ImgService {

  // token 信息
  private token;

  // 调用相机时传入的参数
  private cameraOpt = {
    quality: 50,
    destinationType: 1, // Camera.DestinationType.FILE_URI,
    sourceType: 1, // Camera.PictureSourceType.CAMERA,
    encodingType: 0, // Camera.EncodingType.JPEG,
    mediaType: 0, // Camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true
  };

  // 用户头像参数
  upload: any = {
    url: '',// 接收图片的url
    fileKey: 'file',
    headers: {
      'token': this.token,
    },
    params: {},// 需要额外上传的参数
    success: (data) => { },// 图片上传成功后的回调
    error: (err) => { },// 图片上传失败后的回调
    listen: () => { }// 监听上传过程
  };

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public Camera: Camera,
    public fileTransfer: FileTransfer,
    public globalData: GlobalData,
    private nativeService: NativeService) {
  }

  // 显示照片来源选择
  showPicActionSheet() {
    this.token = this.globalData.token;
    this.useASComponent();
  }

  // 使用ionic中的ActionSheet组件
  private useASComponent() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择',
      buttons: [
        {
          text: '拍照',
          handler: () => this.startCamera()
        },
        {
          text: '从相册选择',
          handler: () => this.openImgPicker()
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    actionSheet.present();
  }

  // 启动拍照功能
  private startCamera() {
    this.Camera.getPicture(this.cameraOpt).then((imageData) => {
      this.uploadImg(imageData);
    }, (err) => {
      this.nativeService.showToast("启动相机失败");
    });
  }

  // 打开手机相册
  private openImgPicker() {
    var options = {
      quality: 50,
      destinationType: this.Camera.DestinationType.FILE_URI,
      sourceType: 0,
      encodingType: this.Camera.EncodingType.JPEG,
      mediaType: this.Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true
    }
    this.Camera.getPicture(options).then((imageData) => {
      this.uploadImg(imageData);
    }, err => {
      this.nativeService.showToast("打开相册失败");
    });
  }

  // 上传图片
  private uploadImg(path: string) {
    if (!path) {
      return;
    }
    this.nativeService.showLoading('正在上传');
    let options: any;
    let cin = (Math.random() * 10).toFixed(0);
    options = {
      fileKey: this.upload.fileKey,
      fileName: cin + 'avtor.jpg',
      headers: this.upload.headers,
      params: this.upload.params
    };
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    options.headers.token = this.token;
    options.params.file = cin + 'avtor.jpg';
    options.headers.sign = this.creatDes('file=' + cin + 'avtor.jpg');
    fileTransfer.upload(path, this.upload.url, options)
      .then((data) => {
        this.nativeService.hideLoading();
        if (this.upload.success) {
          this.upload.success(data);
        }
      }, (err) => {
        this.nativeService.hideLoading();
        if (this.upload.error) {
          this.upload.error(err);
        } else {

        }
      });
  }

  // 创建加密信息
  private creatDes(message) {
    message = message + this.token;
    var keyHex = CryptoJS.enc.Utf8.parse("EY3NrvkR");
    var ivHex = CryptoJS.enc.Utf8.parse("EY3NrvkR");
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

}
