import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountryInfomationPage } from './country-infomation';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    CountryInfomationPage,
  ],
  imports: [
    IonicPageModule.forChild(CountryInfomationPage),ComponentsModule
  ],
})
export class CountryInfomationPageModule {}
