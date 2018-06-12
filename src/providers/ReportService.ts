import { Injectable } from '@angular/core';
import { HttpMyNetService } from './HttpMyNetService';

/**
 * 上报服务
 */
@Injectable()
export class ReportService {

    constructor(
        private httpMyNetService: HttpMyNetService
    ) { }

    /**
     * 获取我的事件上报列表
     * @param params
     */
    getMyReports(params) {
        return this.httpMyNetService.get('user/api/selectEventsReportList', params, true);
    }

    /**
     * 获取我的事件上报详情
     * @param id
     */
    getReportById(id) {
        return this.httpMyNetService.get('user/api/selectEventsReportDetails', { id: id }, true);
    }

    /**
     * 保存事件上报
     * @param params
     */
    saveReport(params) {
        return this.httpMyNetService.postForm('user/api/saveEventsReport', params, true);
    }

    /**
     * 更新事件上报
     * @param params
     */
    updateReport(params) {
        return this.httpMyNetService.postForm('user/api/updateEventsReport', params, true);
    }
  /**
   * 上报人详情GET
   * @param params
   */
   personReport(params) {
      return this.httpMyNetService.get('user/api/getUserMsg', params, true);
  }
    /**
     * 删除事件上报-根据id
     * @param id
     */
    delReportById(id) {
        return this.httpMyNetService.get('user/api/deleteEventsReport', { id: id }, true);
    }

    /**
     * 删除图片
     * @param id
     * @param imgUrl
     */
    delReportImgs(id, imgUrl) {
        return this.httpMyNetService.get('user/api/deleteEventsImg', { id: id, imgUrl }, true);
    }

}
