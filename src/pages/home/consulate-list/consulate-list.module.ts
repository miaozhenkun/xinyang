import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsulateListPage } from './consulate-list';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    ConsulateListPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsulateListPage),ComponentsModule
  ],
})
export class ConsulateListPageModule {}
