import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComprehensiveAnlyPage } from './comprehensive-anly';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    ComprehensiveAnlyPage,
  ],
  imports: [
    IonicPageModule.forChild(ComprehensiveAnlyPage),ComponentsModule
  ],
})
export class ComprehensiveAnlyPageModule {}
