import { Injectable } from '@angular/core';
import { GlobalData } from "./GlobalData";

declare var fundebug;

/**
 * 日志服务
 */
@Injectable()
export class Logger {

  constructor(private globalData: GlobalData) { }

  /**
   * 记录日志
   * @param err 错误信息
   * @param msg 操作内容
   * @param other  其它
   */
  log(err: any, msg: string, other = {}): void {
    console.log('Logger.log：action-' + msg);
    console.log(other);
    console.log(err);
    fundebug.notifyError(err,
      {
        metaData: {
          action: msg,
          other: other,
          user: { id: this.globalData.userId, name: this.globalData.username }
        }
      });
  }

  /**
   * 记录http日志
   * @param err 错误信息
   * @param msg 消息
   * @param other  其它
   */
  httpLog(err: any, msg: string, other = {}): void {
    console.log('Logger.httpLog：msg-' + msg);
    fundebug.notifyHttpError(err,
      {
        metaData: {
          action: msg,
          other: other,
          user: { id: this.globalData.userId, name: this.globalData.username }
        }
      });
  }

}
