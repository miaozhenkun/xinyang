import { Injectable } from '@angular/core';

/**
 * app全局数据
 */
@Injectable()
export class GlobalData {

  private _userId: string;// 用户id
  private _username: string;// 用户名
  private _token: string;// token
  private _userInfo: any;// 用户信息
  private _serial:string;
  private _update:any;
  // 请求是否显示loading,注意:设置为true,当请求执行后需要设置为false
  private _showLoading: boolean = true;

  /**
   * 获取用户id
   */
  get userId(): string {
    return this._userId;
  }

  /**
   * 设置用户id
   */
  set userId(value: string) {
    this._userId = value;
  }

  /**
   * 获取用户名
   */
  get username(): string {
    return this._username;
  }

  /**
   * 设置用户名
   */
  set username(value: string) {
    this._username = value;
  }

  /**
   * 获取token
   */
  get token(): string {
    return this._token;
  }

  /**
   * 设置token
   */
  set token(value: string) {
    this._token = value;
  }

  /**
   * 获取showLoading
   */
  get showLoading(): boolean {
    return this._showLoading;
  }

  /**
   * 设置showLoading
   */
  set showLoading(value: boolean) {
    this._showLoading = value;
  }

  /**
   * 获取用户信息
   */
  get userInfo() {
    return this._userInfo;
  }

  /**
   * 设置用户信息
   */
  set userInfo(userinfo) {
    this._userInfo = userinfo;
  }
  set serial(serial){
    this._serial=serial;
  }
  get serial(){
    return this._serial;
  }
  set update(update){
    this._update=update;
  }
  get update(){
    return this._update;
  }
}
