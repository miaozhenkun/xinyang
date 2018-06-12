import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportListPage } from './report-list';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ReportListPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportListPage),
    ComponentsModule
  ],
})
export class ReportListPageModule { }
