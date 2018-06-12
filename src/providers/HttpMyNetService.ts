import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  URLSearchParams,
  RequestOptionsArgs,
  RequestMethod
} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable, TimeoutError } from "rxjs";

import { Utils } from "./Utils";
import { GlobalData } from "./GlobalData";
import { NativeService } from "./NativeService";
import { APP_SERVE_URL, REQUEST_TIMEOUT } from "./Constants";
import { Logger } from "./Logger";

declare var CryptoJS;

/**
 * 网络请求服务
 */
@Injectable()
export class HttpMyNetService {

  sign;

  constructor(
    public http: Http,
    private globalData: GlobalData,
    public logger: Logger,
    private nativeService: NativeService
  ) { }

  /**
   * 请求远程数据
   * @param url 请求地址
   * @param options 请求配置
   */
  public request(url: string, options: RequestOptionsArgs, isSign: boolean = false,ishowload:boolean=true): Observable<Response> {
    // 转换url地址，若为绝对路径，则不变，若为相对路径，则补充接口前缀地址
    url = url.startsWith('http') ? url : APP_SERVE_URL + url;
    if (isSign) {
      // 增加签名
      options = this.addSign(options);
      // 增加token
      options = this.optionsAddToken(options);
    }

    // 创建请求
    return Observable.create(observer => {
      // 显示加载状态
      if(ishowload){
        this.nativeService.showLoading();
      }
      // 请求
      this.http.request(url, options)
        .timeout(REQUEST_TIMEOUT)// 设置超时时间
        .map(res => res.json())// 转换为json对象
        .subscribe((res: any) => {// 订阅请求返回结果
          // 隐藏加载状态
          this.nativeService.hideLoading();

          // 非get请求返回结果统一处理
          if (options.method == RequestMethod.Get) {// get请求-失败
            if (res.status === 1) {
              this.nativeService.alert(res.message);
            } else if (res.status === 0) {// get请求-成功
              // 执行下一步
              observer.next(res.data);
            } else {
              // 执行下一步
              observer.next(res);
            }
          } else {// 非get请求
            if (res.status == '0') {// 正常
              observer.next(res.data);
            } else if (res.status == '1') {// 异常
              this.nativeService.alert(res.message);
            } else {// 未知
              observer.next(res);
            }
          }
        }, err => {// 请求失败
          this.requestFailed(url, options, err);//处理请求失败
          observer.error(err);
        });
    });
  }

  /**
   * get请求
   * @param url 请求地址
   * @param param 请求参数
   */
  public get(url: string, param: any = null, isSign: boolean = false,ishowload:boolean=true): Observable<Response> {
    if (!isSign) {
      return this.request(url, {
        method: RequestMethod.Get,
        search: this.buildURLSearchParams(param)
      },false,ishowload);
    } else {
      this.sign = this.creatDes(param);
      return this.request(url, {
        method: RequestMethod.Get,
        search: this.buildURLSearchParams(param),
      }, true,ishowload);
    }

  }

  /**
   * post请求【json格式参数】
   * @param url 请求地址
   * @param param 请求参数
   */
  public post(url: string, param: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: param,
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      })
    }));
  }

  /**
   * post请求【form格式参数】
   * @param url 请求地址
   * @param param 请求参数
   */
  public postForm(url: string, param: any = null, isSign: boolean = false,ishowload:boolean=true): Observable<Response> {
    if (!isSign) {
      return this.request(url, new RequestOptions({
        method: RequestMethod.Post,
        body: this.buildURLSearchParams(param),
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        })
      }),false,ishowload);
    } else {
      this.sign = this.creatDes(param);
      return this.request(url, {
        method: RequestMethod.Post,
        body: this.buildURLSearchParams(param),
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        })
      }, true,ishowload);
    }

  }

  /**
   * put请求
   * @param url 请求地址
   * @param param 请求参数
   */
  public put(url: string, param: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Put,
      body: param
    }));
  }

  /**
   * delete请求
   * @param url 请求地址
   * @param param 请求参数
   */
  public delete(url: string, param: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Delete,
      body: param
    }));
  }

  /**
   * patch请求
   * @param url 请求地址
   * @param param 请求参数
   */
  public patch(url: string, param: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Patch,
      body: param
    }));
  }

  /**
   * head请求
   * @param url 请求地址
   * @param param 请求参数
   */
  public head(url: string, param: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Head,
      search: param
    }));
  }

  /**
   * options请求
   * @param url 请求地址
   * @param param 请求参数
   */
  public options(url: string, param: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Options,
      search: param
    }));
  }

  /**
   * 将对象转为查询参数
   * @param param 参数
   * @returns 查询参数
   */
  private buildURLSearchParams(param): URLSearchParams {
    let searchParams = new URLSearchParams();
    if (!param) {
      return searchParams;
    }
    let newParams = this.sortObject(param);
    for (let key in newParams) {
      let val = newParams[key];
      if (val instanceof Date) {
        val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
      }
      searchParams.set(key, val);
    }
    return searchParams;
  }

  /**
   * 处理请求失败事件
   * @param url 请求地址
   * @param options 请求配置
   * @param err 返回结果
   */
  private requestFailed(url: string, options: RequestOptionsArgs, err: Response): void {
    // 隐藏加载状态
    this.nativeService.hideLoading();

    // 请求超时错误
    if (err instanceof TimeoutError) {
      this.nativeService.alert('请求超时,请稍后再试!');
      return;
    }

    // 未联网
    if (!this.nativeService.isConnecting()) {
      this.nativeService.alert('请求失败，请连接网络');
      return;
    }

    let msg = '请求失败';
    try {
      let result = err.json();
      // 提示失败信息
      this.nativeService.alert(result.message || msg);
    } catch (err) {
      let status = err.status;
      if (status === 0) {
        msg = '请求失败，请求响应出错';
      } else if (status === 401) {
        msg = '请求失败，请重新登录';
      } else if (status === 403) {
        msg = '请求失败，无权访问';
      } else if (status === 404) {
        msg = '请求失败，未找到请求地址';
      } else if (status === 500) {
        msg = '请求失败，服务器出错，请稍后再试';
      }
      this.nativeService.alert(msg);
    }
  }

  /**
   * 增加请求token
   * @param options
   */
  private optionsAddToken(options: RequestOptionsArgs) {
    if (!options) return;
    let token = this.globalData.token;
    let method = options.method;
    if (options.headers) {
      options.headers.append('token', token);
      options.method = method;
    } else {
      options.headers = new Headers({
        'token': token
      });
      options.method = method;
    }
    return options;
  }

  /**
   * 添加签名
   * @param options
   */
  private addSign(options: RequestOptionsArgs) {

    if (!options) return;
    let method = options.method;
    if (options.headers) {
      options.headers.append('sign', this.sign);
      options.method = method;
    } else {
      options.headers = new Headers({
        'sign': this.sign
      });
      options.method = method;
    }
    return options;
  }

  /**
   * 生成签名
   * @param message
   */
  private creatDes(param) {
    param = param || {};
    var newParam = this.sortObject(param);
    let str = JSON.stringify(newParam);
    str = str.replace("{", "");
    str = str.replace("}", "");
    str = str.replace(/":/g, "\"=");
    str = str.replace(",", "");
    str = str.replace(/",/g, "\"");
    str = str.replace(/\"/g, "");
    str = str.toLowerCase();
    let token = this.globalData.token;
    if(token){
      str = str + token;
    }
    var keyHex = CryptoJS.enc.Utf8.parse("EY3NrvkR");
    var ivHex = CryptoJS.enc.Utf8.parse("EY3NrvkR");
    var encrypted = CryptoJS.DES.encrypt(str, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
    );
    return encrypted.toString();
  }

  // 为对象排序并过滤空属性
  private sortObject(obj) {
    if (!obj) return;
    var newObj = {};
    let keys = Object.keys(obj).sort();
    for (let i in keys) {
      let key = keys[i];
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }

}
