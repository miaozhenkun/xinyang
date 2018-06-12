import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicityEduPlayPage } from './publicity-edu-play';
import {VideoPlayerModule} from "../../../components/video-player/video-player.module";

@NgModule({
  declarations: [
    PublicityEduPlayPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicityEduPlayPage),VideoPlayerModule
  ],
})
export class PublicityEduPlayPageModule {}
