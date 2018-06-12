import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZxNewsPage } from './zx-news';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    ZxNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ZxNewsPage),ComponentsModule
  ],
})
export class ZxNewsPageModule {}
