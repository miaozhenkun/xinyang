import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccessNumPage } from './access-num';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    AccessNumPage,
  ],
  imports: [
    IonicPageModule.forChild(AccessNumPage),ComponentsModule
  ],
})
export class AccessNumPageModule {}
