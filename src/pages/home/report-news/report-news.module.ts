import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportNewsPage } from './report-news';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    ReportNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportNewsPage),ComponentsModule
  ],
})
export class ReportNewsPageModule {}
