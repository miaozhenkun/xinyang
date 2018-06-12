import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportDegtailPage } from './report-degtail';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    ReportDegtailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportDegtailPage),ComponentsModule
  ],
})
export class ReportDegtailPageModule {}
