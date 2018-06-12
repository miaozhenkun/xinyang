import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsDegtailPage } from './news-degtail';
@NgModule({
  declarations: [
    NewsDegtailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsDegtailPage)
  ],
})
export class NewsDegtailPageModule {}
