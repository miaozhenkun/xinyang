import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnMessageListPage } from './un-message-list';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    UnMessageListPage
  ],
  imports: [
    IonicPageModule.forChild(UnMessageListPage),
    ComponentsModule
  ],
})
export class UnMessageListPageModule { }
