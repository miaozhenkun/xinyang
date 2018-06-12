import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicHealthAnlyPage } from './public-health-anly';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    PublicHealthAnlyPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicHealthAnlyPage),ComponentsModule
  ],
})
export class PublicHealthAnlyPageModule {}
