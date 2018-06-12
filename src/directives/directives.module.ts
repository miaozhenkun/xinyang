import { NgModule } from '@angular/core';
import { PermissionDirective } from './permission/permission';
import { AutoAreatextDirective } from './auto-areatext/auto-areatext';

/**
 * 指令模块
 */
@NgModule({
  declarations: [
    PermissionDirective,
    AutoAreatextDirective
  ],
  imports: [],
  exports: [
    PermissionDirective,
    AutoAreatextDirective
  ]
})
export class DirectivesModule {}
