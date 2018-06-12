import { NgModule } from '@angular/core';
import { MessagePage} from './message';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [MessagePage],
  imports: [IonicPageModule.forChild(MessagePage), ComponentsModule],
})
export class AboutPageModule { }
