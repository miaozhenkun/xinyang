import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsulatePage } from './consulate';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    ConsulatePage,
  ],
  imports: [
    IonicPageModule.forChild(ConsulatePage),ComponentsModule
  ],
})
export class ConsulatePageModule {}
