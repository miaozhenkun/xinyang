import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LbkxNewsPage } from './lbkx-news';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    LbkxNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(LbkxNewsPage),ComponentsModule
  ],
})
export class LbkxNewsPageModule {}
