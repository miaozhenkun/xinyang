import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {HttpMyNetService} from './HttpMyNetService';
import {StorageKVService} from './StorageKVService';
import {ModalController} from 'ionic-angular';




/**
 * 用户服务
 */
@Injectable()
export class UserService {

  // 用户本地存储KEY
  private KEY_USERINFO = "userinfo";


  constructor(private httpMyNetService: HttpMyNetService,
              private kv: StorageKVService,
              public modalCtrl: ModalController) {
  }


  // 登录
  login(params) {
    return new Promise<Object>(resolve =>
      this.httpMyNetService.postForm('user/userController/login', params)
        .subscribe(data => {
          // 登录信息保存本地
          this.kv.set(this.KEY_USERINFO, data).then(() => {
            resolve(data);
          })
        })
    );
  }
  // 登出
  logout() {
    return this.kv.remove(this.KEY_USERINFO);
  }

  /**
   * 当前是否登录
   * @param isNeedShowLogin 是否需要显示登录页面
   */
  isLogin(isNeedShowLogin: boolean = false) {
    return new Promise<Boolean>(resolve =>
      this.getLoginInfo().then(data => {
        let isLogin = data ? true : false;
        resolve(isLogin);
        if (!isLogin && isNeedShowLogin) {
          this.modalCtrl.create('LoginPage').present();
        }
      })
    );
  }

  // 获取登录用户信息
  getLoginInfo() {
    return this.kv.get(this.KEY_USERINFO);
  }

  // 获取用户头像
  public getAvatar() {
    return this.httpMyNetService.get('/system/user/getAvatar').map(res => res.json());
  }

  // 更新用户头像
  public updateAvatar(params) {
    return this.httpMyNetService.post('/system/user/updateAvatar', params).map(res => res.json());
  }

  // 获取列表数据-测试
  public getList(params) {
    return this.httpMyNetService.get('/demo/getList', params).map(res => res.json());
  }


  // 用户注册
  public userRegist(params) {
    return this.httpMyNetService.postForm('user/userController/registUser', params);
  }

  // 检查用户名是否已经注册
  public checkUser(params) {
    return this.httpMyNetService.postForm('user/userController/checkUser', params);
  }

  // 获取短信验证码
  public getUserSms(params) {
    return this.httpMyNetService.get('user/userController/sms', params, true);
  }

  // 修改用户资料
  public changeInfo(params) {
    return this.httpMyNetService.postForm('user/userController/updateUser', params, true);
  }

  // 修改密码
  public changePassword(params) {
    return this.httpMyNetService.postForm('user/userController/updatePwd', params, true);
  }

  // 意见反馈列表
  public feedBackList(params) {
    return this.httpMyNetService.get('user/api/selectfeedBackList', params, true);
  }

  // 意见反馈详情
  public feedBackDegtail(params) {
    return this.httpMyNetService.get('user/api/selectfeedBackDetails', params, true);
  }

  // 意见反馈保存
  public feedBack(params) {
    return this.httpMyNetService.postForm('user/api/savefeedBack', params, true);
  }

  // 重置密码
  public resetPwd(params) {
    return this.httpMyNetService.postForm('user/userController/resetPwd', params, true);
  }

  // 未读数量
  public getNum(params) {
    return this.httpMyNetService.get('newMessagesController/api/selectNum', params,false,false);
  }
  // 未读快讯列表
  public selectIcReadList(params) {
    return this.httpMyNetService.get('newMessagesController/api/selectIcReadList', params);
  }



  // 未读安全提醒列表
  public unSafeReadList(params) {
    return this.httpMyNetService.get('newMessagesController/api/selectInReadList', params);
  }

  // 未读报告列表
  public unReportList(params) {
    return this.httpMyNetService.get('newMessagesController/api/selectReportReadList', params);
  }

  //GET /lbxm-app/appVersionController/api/getAppVersion 版本信息
  public getAppVersion(params) {
    return this.httpMyNetService.get('appVersionController/api/getAppVersion', params);
  }
  //查询能接收推送的用户
  public getPushPerson() {
    return this.httpMyNetService.get('MsgPush/api/getPushPerson', null);
  }
  //发送消息
  public jiguangPush(params) {
    return this.httpMyNetService.postForm('MsgPush/api/jiguangPush', params,true);
  }

}
