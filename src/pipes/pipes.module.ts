import { NgModule } from '@angular/core';

import { DicTransPipe } from './dic-trans/dic-trans';
import { DefaultValuePipe } from "./defaultValue/defaultValue";

/**
 * 管道模块
 */
@NgModule({
  declarations: [
    DefaultValuePipe,
    DicTransPipe
  ],
  imports: [
  ],
  exports: [
    DefaultValuePipe,
    DicTransPipe
  ]
})
export class PipesModule { }