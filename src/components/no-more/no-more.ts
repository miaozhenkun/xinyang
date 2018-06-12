import { Component, Input } from '@angular/core';

/**
 * 组件-没有更多
 */
@Component({
  selector: 'no-more',
  templateUrl: 'no-more.html'
})
export class NoMoreComponent {

  @Input() hasMore: boolean;

}
