import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReliefAgenciesPage } from './relief-agencies';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    ReliefAgenciesPage,
  ],
  imports: [
    IonicPageModule.forChild(ReliefAgenciesPage),ComponentsModule
  ],
})
export class ReliefAgenciesPageModule {}
