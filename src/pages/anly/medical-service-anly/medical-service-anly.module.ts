import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalServiceAnlyPage } from './medical-service-anly';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    MedicalServiceAnlyPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalServiceAnlyPage),ComponentsModule
  ],
})
export class MedicalServiceAnlyPageModule {}
