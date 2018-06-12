import { Observable } from "rxjs";
import { Response } from '@angular/http';

/**
 * 列表页面基类
 */
export abstract class BaseListPage {

  // 查询参数
  params = { authority:0,page: 1 };
  // 数据列表
  items: any;
  // 初始化列表位置
  page = 1;
  // 每页列表数
  pagesize = 20;
  // 是否有更多
  hasmore = true;

  /**
   * 获取远程数据
   */
  abstract getRemoteList(params): Observable<Response>;

  // 初始化数据
  initData() {
    this.loaddata(true, null, null);
  }

  // 加载数据
  loaddata(isFirstload, refresher: any, infiniteScroll: any) {
    this.getRemoteList(this.params).subscribe((data: any) => {
      data = data || [];
      if (refresher || isFirstload) {
        this.items = data;
      }
      if (refresher) {
        refresher.complete();
      }
      if (infiniteScroll) {
        this.items = this.items.concat(data);
        infiniteScroll.complete();
      }
      if (data.length < this.pagesize) {
        this.hasmore = false;
      } else {
        this.hasmore = true;
      }
    }, err => {
      if (refresher) {
        refresher.complete();
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    })
  }

  // 上拉加载
  doInfinite(infiniteScroll) {
    if (this.hasmore) {
      this.params.page++;
      this.loaddata(false, null, infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.items = [];
    this.params.page = 1;
    this.loaddata(false, refresher, null);
  }

}
