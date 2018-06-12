import { Pipe, PipeTransform } from '@angular/core';
import { GLOBAL_DICSMAP } from '../../providers/Constants'

/**
 * 字典转换：用法 {{gener|dicTrans:'GENDER'}}
 */
@Pipe({
  name: 'dicTrans',
})
export class DicTransPipe implements PipeTransform {

  // 默认转换失败显示内容
  NULL_VALUE = "";
  // 本地字典
  GLOBAL_DICSMAP = GLOBAL_DICSMAP;

  // 转换
  transform(value: string, ...args) {
    return this.getDescByCode(value, args);
  }

  // 根据编码获取描述
  getDescByCode(type, code) {
    if (type === undefined || code === undefined) {
      return this.NULL_VALUE;
    }
    let codeMap = this.GLOBAL_DICSMAP[code];
    return codeMap ? codeMap[type] : this.NULL_VALUE;
  }

}
