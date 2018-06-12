import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedBackListPage } from './feed-back-list';

@NgModule({
  declarations: [
    FeedBackListPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedBackListPage),
  ],
})
export class FeedBackListPageModule {}
