import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChCapitalinsPage } from './ch-capitalins';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    ChCapitalinsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChCapitalinsPage),ComponentsModule
  ],
})
export class ChCapitalinsPageModule {}
