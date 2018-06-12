import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZxCallPage } from './zx-call';

@NgModule({
  declarations: [
    ZxCallPage,
  ],
  imports: [
    IonicPageModule.forChild(ZxCallPage),
  ],
})
export class ZxCallPageModule {}
