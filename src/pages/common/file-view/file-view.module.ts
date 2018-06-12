import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileViewPage } from './file-view';

@NgModule({
  declarations: [
    FileViewPage,
  ],
  imports: [
    IonicPageModule.forChild(FileViewPage),
  ],
})
export class FileViewPageModule {}
