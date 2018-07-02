import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataAccessPage } from './data-access';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    DataAccessPage,
  ],
  imports: [
    IonicPageModule.forChild(DataAccessPage),ComponentsModule
  ],
})
export class DataAccessPageModule {}
