import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from "../../pipes/pipes.module";
import { DirectivesModule } from "../../directives/directives.module";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage), PipesModule, DirectivesModule,ComponentsModule]
})
export class homePageModule { }
