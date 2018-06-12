import { Pipe, PipeTransform } from '@angular/core';

/**
 * 默认空值过滤器
 */
@Pipe({
  name: 'defaultValue',
})
export class DefaultValuePipe implements PipeTransform {
  transform(value: string, ...args) {
    if (value == null || value == "null") {
      return '';
    } else {
      return value;
    }
  }
}
