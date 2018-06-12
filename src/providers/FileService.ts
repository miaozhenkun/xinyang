import { Injectable } from "@angular/core";
import { ActionSheetController } from "ionic-angular";
import { Camera } from "@ionic-native/camera";
import { FileTransfer, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer';
import { GlobalData } from "./GlobalData";
import { NativeService } from "./NativeService";
import { APP_SERVE_URL } from "./Constants";

declare var CryptoJS;

/**
 * 本地文件服务：照片、视频等
 */
@Injectable()
export class FileService {

  // 文件后缀
  private SUFFIX_IMAGE = ['jpg', 'png', 'jpeg', 'gif', 'bmp'];
  private SUFFIX_VIDEO = ['mp4', 'avi', 'mpg', 'mov', 'swf', 'mpg', 'mpeg', 'ram', 'ra', 'rm', 'rmvb'];
  private SUFFIX_AUDIO = ['wav', 'aif', 'au', 'mp3', 'ram', 'wma', 'mmf', 'amr', 'aac', 'flac'];

  // 文件上传地址
  private FILE_UPLOAD_URL: string = APP_SERVE_URL + "fileController/uploadFile";

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public fileTransfer: FileTransfer,
    public globalData: GlobalData,
    private nativeService: NativeService,
  ) { }

  /**
   * 获取照片
   */
  getPhoto() {
    return new Promise<Object>(resolve => {
      let actionSheet = this.actionSheetCtrl.create({
        title: '选择',
        buttons: [
          {
            text: '拍照',
            handler: () => {
              this.camera.getPicture({
                sourceType: this.camera.PictureSourceType.CAMERA,
                mediaType: this.camera.MediaType.PICTURE,
                allowEdit: false,
                correctOrientation: true
              }).then((path) => {
                resolve(path);
              });
            }
          },
          {
            text: '从相册选择',
            handler: () => {
              this.camera.getPicture({
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                mediaType: this.camera.MediaType.PICTURE,
                allowEdit: false,
                correctOrientation: true
              }).then((path) => {
                resolve(path);
              });
            }
          },
          {
            text: '取消',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    });
  }

  /**
   * 获取照片并上传
   */
  getPhotoAndUpload() {
    return new Promise<Object>(resolve => {
      this.getPhoto().then((filePath: string) => {
        this.uploadFile(filePath, 'photo.jpg').then(responseFileData => {
          resolve(responseFileData);
        })
      });
    });
  }

  // /**
  //  * 获取视频
  //  */
  // getVideo() {
  //   return new Promise<Object>(resolve => {
  //     let actionSheet = this.actionSheetCtrl.create({
  //       title: '选择',
  //       buttons: [
  //         {
  //           text: '录制视频',
  //           handler: () => {
  //             this.mediaCapture.captureVideo({ limit: 1 })
  //               .then((files: MediaFile[]) => {
  //                 resolve(files[0].fullPath);
  //               });
  //           }
  //         },
  //         {
  //           text: '从相册选择',
  //           handler: () => {
  //             this.camera.getPicture({
  //               sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //               mediaType: this.camera.MediaType.VIDEO
  //             }).then((path) => {
  //               resolve(path);
  //             });
  //           }
  //         },
  //         {
  //           text: '取消',
  //           role: 'cancel'
  //         }
  //       ]
  //     });
  //     actionSheet.present();
  //   });
  // }

  // /**
  //  * 获取视频并上传
  //  */
  // getVideoAndUpload() {
  //   return new Promise<Object>(resolve => {
  //     this.getVideo().then((filePath: string) => {
  //       this.uploadFile(filePath, 'video.mp4').then(responseFileData => {
  //         resolve(responseFileData);
  //       })
  //     });
  //   });
  // }

  /**
   * 获取音频
   */
  // getAudio() {
  //   return new Promise<Object>(resolve => {
  //     let actionSheet = this.actionSheetCtrl.create({
  //       title: '选择',
  //       buttons: [
  //         {
  //           text: '录音',
  //           handler: () => {
  //             this.mediaCapture.captureAudio({ limit: 1 })
  //               .then((files: MediaFile[]) => {
  //                 resolve(files[0].fullPath);
  //               }, (err) => {
  //                 this.nativeService.showToast("录音失败");
  //               });
  //           }
  //         },
  //         {
  //           text: '取消',
  //           role: 'cancel'
  //         }
  //       ]
  //     });
  //     actionSheet.present();
  //   });
  // }

  /**
   * 获取音频并上传
   */
  // getAudioAndUpload() {
  //   return new Promise<Object>(resolve => {
  //     this.getAudio().then((filePath: string) => {
  //       this.uploadFile(filePath, 'audio.mp3').then(responseFileData => {
  //         resolve(responseFileData);
  //       })
  //     });
  //   });
  // }

  /**
   * 上传文件
   */
  uploadFile(filePath, fileName) {
    return new Promise<Object>(resolve => {
      if (!filePath) {
        resolve();
      } else {
        this.nativeService.showLoading('正在上传');
        const fileTransfer: FileTransferObject = this.fileTransfer.create();
        fileTransfer.upload(filePath, this.FILE_UPLOAD_URL, {
          fileKey: 'file',
          fileName: fileName,
          headers: {
            token: this.globalData.token,
            sign: this.creatDes('file=' + fileName)
          },
          params: {
            file: fileName
          }
        })
          .then((res: FileUploadResult) => {
            this.nativeService.hideLoading();
            let responseCode = res.responseCode;
            let response = res.response;
            let responseData = JSON.parse(response);
            if (responseCode == 200 && responseData.status == 0) {// 正常
              resolve(responseData.data);
            } else {// 异常
              this.nativeService.showToast(responseData.message);
            }
          }, (err) => {
            this.nativeService.hideLoading();
            this.nativeService.showToast("文件上传失败");
          });
      }
    });
  }

  // 创建加密信息
  creatDes(message) {
    message = message + this.globalData.token;
    var keyHex = CryptoJS.enc.Utf8.parse("EY3NrvkR");
    var ivHex = CryptoJS.enc.Utf8.parse("EY3NrvkR");
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  /**
     * 转换文件地址为文件对象
     */
  changeImgUrlToFile(imgUrl) {
    if (!imgUrl) return;
    let url = imgUrl;
    url = url.replace(/\\/g, '/');
    let suffix = url.substr(url.lastIndexOf(".") + 1).toLowerCase();
    let fileType;
    if (this.contains(this.SUFFIX_IMAGE, suffix)) {
      fileType = 'image';
    } else if (this.contains(this.SUFFIX_VIDEO, suffix)) {
      fileType = 'video';
    } else if (this.contains(this.SUFFIX_AUDIO, suffix)) {
      fileType = 'audio';
    } else {
      fileType = 'other';
    }
    let name = url.substr(url.lastIndexOf("/") + 1);
    let file = { url: url, name: name, type: fileType };
    return file;
  }

  // 是否包含
  contains(arr, val) {
    if (!arr || !val) return false;
    if (arr.indexOf(val.toLowerCase()) !== -1) {
      return true;
    } else {
      return false;
    }
  }

}
