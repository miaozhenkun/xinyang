import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NoMoreComponent } from './no-more/no-more';
import { MyRefresherContentComponent } from './my-refresher-content/my-refresher-content';
import { MyInfiniteScrollContentComponent } from './my-infinite-scroll-content/my-infinite-scroll-content';
import { EchartComponent } from './echart/echart';

/**
 * 公共组件
 */
@NgModule({
  declarations: [NoMoreComponent,
    MyRefresherContentComponent,
    MyInfiniteScrollContentComponent,
    EchartComponent],
  imports: [IonicModule],
  exports: [NoMoreComponent,
    MyRefresherContentComponent,
    MyInfiniteScrollContentComponent,
    EchartComponent]
})
export class ComponentsModule { }
