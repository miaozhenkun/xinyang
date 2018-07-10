import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionnairePage } from './questionnaire';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    QuestionnairePage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionnairePage),ComponentsModule
  ],
})
export class QuestionnairePageModule {}
