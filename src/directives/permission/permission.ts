import { Directive } from '@angular/core';

/**
 * 权限指令
 */
@Directive({
  selector: '[permission]'
})
export class PermissionDirective {

  constructor() {
    console.log('待开发');
  }

}
