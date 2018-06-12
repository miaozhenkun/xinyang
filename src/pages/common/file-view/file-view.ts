import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileService } from '../../../providers/FileService';
import { DomSanitizer } from '@angular/platform-browser';
import {PhotoViewer} from "@ionic-native/photo-viewer";

/**
 * 文件查看页面
 */
@IonicPage()
@Component({
  selector: 'page-file-view',
  templateUrl: 'file-view.html',
})
export class FileViewPage {

  // 标题
  private title: string;
  // 普通地址
  private url: string;
  // 安全地址
  private safeUrl: any;
  // 文件类型
  private type: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fileService: FileService,
    private domSanitizer: DomSanitizer,
    private photoViewer: PhotoViewer
  ) {

    this.title = this.navParams.get('title') || '查看';
    this.url = this.navParams.get('url');
    if (this.url) {
      let file = this.fileService.changeImgUrlToFile(this.url);
      this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.navParams.get('url'));
      this.type = file ? file.type : null;
      console.log(file);
      console.log(this.type);
    }
    if(this.type=='image'){
      this.photoViewer.show( this.url, '', {share: false});
    }

  }
  showphoto(){
    this.photoViewer.show( this.url, '', {share: false});
  }

}
