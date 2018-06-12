import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalInsurancePage } from './medical-insurance';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    MedicalInsurancePage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalInsurancePage),ComponentsModule
  ],
})
export class MedicalInsurancePageModule {}
