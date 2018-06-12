import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafeNewsPage } from './safe-news';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    SafeNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(SafeNewsPage),ComponentsModule
  ],
})
export class SafeNewsPageModule {}
