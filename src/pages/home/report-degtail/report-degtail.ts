import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Content} from 'ionic-angular';
import { HomeService } from "../../../providers/HomeService";
import {NativeService} from "../../../providers/NativeService";

/**
 * 报告详情
 */
@IonicPage()
@Component({
  selector: 'page-report-degtail',
  templateUrl: 'report-degtail.html',
})
export class ReportDegtailPage {
  id;
  pdfurl;
  numPages:any;
  index;
  cpdf;
  scale=1.5;
  canvas;
  context;
  item;
  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public homeService: HomeService,public cd: ChangeDetectorRef,public  nativeService:NativeService
  ) { }

  // ionViewDidLoad() {
  //   let that=this;
  //   that.canvas = document.getElementById('the-canvas');
  //   that.context = that.canvas.getContext('2d');
  //   //that.context.scale(1,2);
  //   this.id = this.navParams.data.id;
  //   this.homeService.getReportNewsDegtail({ id: this.id }).subscribe(data => {
  //     that.nativeService.showLoading('加载文件中...');
  //     this.pdfurl = data[0].content;
  //     PDFJS.getDocument(this.pdfurl).then(function getPdfHelloWorld(pdf) {
  //       that.cpdf=pdf;
  //       that.numPages=pdf.pdfInfo.numPages;
  //       that.showpdf(1,pdf);
  //     });
  //   })
  // }
  // showpdf(cindex,pdf){
  //   this.index=cindex;
  //   let that=this;
  //   pdf.getPage(cindex).then(function getPageHelloWorld(page) {
  //     var viewport = page.getViewport(that.scale);
  //     that.context = that.canvas.getContext('2d');
  //     that.canvas.height = viewport.height;
  //     that.canvas.width = viewport.width;
  //     var renderContext = {
  //       canvasContext: that.context,
  //       viewport: viewport
  //     };
  //     page.render(renderContext);
  //     that.cd.detectChanges();
  //     that.content.resize();
  //     that.nativeService.hideLoading();
  //   });
  // }
  // lastpage(){
  //   if(this.index>1){
  //     this.content.scrollToTop();
  //      this.index=this.index-1;
  //     this.showpdf(this.index,this.cpdf);
  //   }
  // }
  // nextpage(){
  //   if(this.index<this.numPages){
  //     this.index=this.index+1;
  //     this.showpdf(this.index,this.cpdf);
  //   }
  // }
  ionViewDidLoad() {
    this.id = this.navParams.data.id;
    this.homeService.getTfReportDetailsHtml({ id: this.id }).subscribe(data => {
      console.log(data);
      this.item=data[0].CONTENT;
    });
  }

}
