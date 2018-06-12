import { Injectable } from "@angular/core";
import { Validators, AbstractControl } from '@angular/forms';

/**
 * 公共校验方法
 */
@Injectable()
export class CommonValidators extends Validators {

  /*E-mail*/
  static email = function (control: AbstractControl) {
    return CommonValidators.validatorsByPattern('email', control, '[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?');
  };

  /*手机号码*/
  static phone = function (control: AbstractControl) {
    return CommonValidators.validatorsByPattern('phone', control, '1[0-9]{10,10}');
  };

  /*密码*/
  static password = function (control: AbstractControl) {
    return CommonValidators.minLength(6);
  };

  /*中文*/
  static chinese = function (control: AbstractControl) {
    return CommonValidators.validatorsByPattern('chinese', control, '[(\u4e00-\u9fa5)]+');
  };

  /*英文、数字包括下划线*/
  static legallyNamed = function (control: AbstractControl) {
    return CommonValidators.validatorsByPattern('legallyNamed', control, '[A-Za-z0-9_]+');
  };

  /**
   * 根据正则表达式校验
   */
  static validatorsByPattern = function (name: string, control: AbstractControl, pattern: string) {
    let validatorFn = Validators.pattern(pattern)(control);
    if (validatorFn != null) {
      validatorFn[name] = validatorFn['pattern'];
    }
    return validatorFn;
  };

}
