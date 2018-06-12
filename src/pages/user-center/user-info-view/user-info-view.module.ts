import { NgModule, } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInfoViewPage } from './user-info-view';
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
  declarations: [UserInfoViewPage],
  imports: [IonicPageModule.forChild(UserInfoViewPage),PipesModule]
})
export class UserInfoViewModule { }
