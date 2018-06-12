import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {HttpMyNetService} from './HttpMyNetService';

/**
 * 首页相关服务-新闻资讯等
 */
@Injectable()
export class HomeService {

  constructor(private httpMyNetService: HttpMyNetService) {
  }

  // 获取轮播图
  public getgetTfRollingImg() {
    return this.httpMyNetService.get('tfRollingController/api/getTfRollingImg?Page=1', null);
  }

  // 最新消息列表
  public getHotNewsList(param) {
    return this.httpMyNetService.get('tfRollingController/api/getHotNewsList', param, false, false);
  }

  // 获取与中国有关的信息
  public getChinaNews() {
    return this.httpMyNetService.get('tfRollingController/api/getIsChinese?Page=1', null);
  }

  // 获取领保快讯
  public getlbkxNewsList(pamars) {
    return this.httpMyNetService.get('tfInCidentController/api/getInCidentList', pamars, false, false);
  }

  // 获取领保快讯详情
  public getlbkxNewsDegtail(pamars) {
    return this.httpMyNetService.get('tfInCidentController/api/getInCidentDetails', pamars);
  }

  // 获取资讯列表
  public getZxNewsList(pamars) {
    return this.httpMyNetService.get('tfRollingController/api/getTfRollingList', pamars, false, false);
  }

  // 获取资讯详情
  public getZxNewsDegtail(pamars) {
    return this.httpMyNetService.get('tfRollingController/api/getTfRollingDetails', pamars);
  }

  // 获取安全提示信息列表
  public getSafeNewsList(pamars) {
    return this.httpMyNetService.get('tfInformanagerController/getTfInformanagerList', pamars, false, false);
  }

  // 获取安全提示信息详情
  public getSafeNewsDegtail(pamars) {
    return this.httpMyNetService.get('tfInformanagerController/getTfInformanagerDetails', pamars);
  }

  // 获取报告信息列表
  public getReportNewsList(pamars) {
    return this.httpMyNetService.get('tfReportController/api/getTfReportlist', pamars, false, false);
  }

  // 获取报告信息详情
  public getReportNewsDegtail(pamars) {
    return this.httpMyNetService.get('tfReportController/api/getTfReportDetails', pamars, false, false);
  }

 //报告详情html
  public getTfReportDetailsHtml(pamars) {
    return this.httpMyNetService.get('tfReportController/api/getTfReportDetailsHtml', pamars, false, false);
  }
  // 获取中资机构
  public getChCapitaltionList(pamars) {
    return this.httpMyNetService.get('tfChFundController/api/getTfChFundList', pamars, false, false);
  }

  // 获取中资机构详情
  public getChcapitalDegtail(pamars) {
    return this.httpMyNetService.get('tfChFundController/api/getTfChFundDetails', pamars);
  }

  // 获取国别信息
  public getCountryList(pamars) {
    return this.httpMyNetService.get('tfCountryController/api/getTfCountryList', pamars, false, false);
  }

  // 获取国别详情
  public getCountryDegtail(pamars) {
    return this.httpMyNetService.get('tfCountryController/api/getInCidentDetails', pamars);
  }

  // 获取其它国别详情
  public getCountryDegtailSec(pamars) {
    return this.httpMyNetService.get('tfCountryController/api/getCountryMsg', pamars);
  }

  // 获取使领馆信息
  public getConsulateList(pamars) {
    return this.httpMyNetService.get('tfEmAmbassadorController/api/getTfEmAmbassadorList', pamars, false, false);
  }

  // 获取使领馆详情
  public getConsulateDegtail(pamars) {
    return this.httpMyNetService.get('tfEmAmbassadorController/api/getTfEmAmbassadorDetails', pamars);
  }

  // 获取法律法规列表
  public getLawsList(pamars) {
    return this.httpMyNetService.get('tfLawController/api/getLawTitleList', pamars, false, false);
  }

  // 获取法律法规第二类列表
  public getLawsSecList(pamars) {
    return this.httpMyNetService.get('tfLawController/api/getLawList', pamars, false, false);
  }

  // 获取法律法规详情
  public getLawsDegtail(pamars) {
    return this.httpMyNetService.get('tfLawController/api/getTfLawDetails', pamars);
  }

  // 根据国家查询使领馆列表
  public getEmAmbassadorName(pamars) {
    return this.httpMyNetService.get('tfEmAmbassadorController/api/getEmAmbassadorName', pamars);
  }

  // 更新安全提醒讯已读用户传列表
  public updateSafeReadList(pamars) {
    return this.httpMyNetService.postForm('newMessagesController/api/updateInUser', pamars, false, false);
  }

  // 更新快讯已读用户传列表
  public updateKxReadList(pamars) {
    return this.httpMyNetService.postForm('newMessagesController/api/updateIncidentUser', pamars, false, false);
  }

  // 更新报告已读用户传列表
  public updateReportReadList(pamars) {
    return this.httpMyNetService.postForm('newMessagesController/api/updateReportUser', pamars, false, false);
  }

  //获取一级标题列表
  public getTfIntenareliefList(pamars) {
    return this.httpMyNetService.get('tfIntenarelief/getTfIntenareliefList', pamars, false, false);
  }

  //获取一级标题列表详情
  public getTfIntenareliefDetails(pamars) {
    return this.httpMyNetService.get('tfIntenarelief/getTfIntenareliefDetails', pamars, false, false);
  }

  //获取二级标题列表
  public getTfIntenareliefFbList(pamars) {
    return this.httpMyNetService.get('tfIntenarelief/getTfIntenareliefFbList', pamars, false, false);
  }

  //获取二级标题详情
  public getTfIntenareliefFbDetails(pamars) {
    return this.httpMyNetService.get('tfIntenarelief/getTfIntenareliefFbDetails', pamars, false, false);
  }
  // 宣传教育一级列表  GET /lbxm-app/educaController/api/getMovies
  public getMovies(pamars) {
    return this.httpMyNetService.get('educaController/api/getMovies', pamars, false, false);
  }
  //宣传教育二级列表
  public getSecondList(pamars) {
    return this.httpMyNetService.get('educaController/api/getSecondList', pamars, false, false);
  }


}
