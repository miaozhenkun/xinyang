import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonitorPage } from './monitor';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    MonitorPage,
  ],
  imports: [
    IonicPageModule.forChild(MonitorPage),ComponentsModule
  ],
})
export class MonitorPageModule {}
