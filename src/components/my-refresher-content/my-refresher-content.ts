import { Component } from '@angular/core';

/**
 * 自定义下拉刷新内容
 */
@Component({
  selector: 'my-refresher-content',
  templateUrl: 'my-refresher-content.html'
})
export class MyRefresherContentComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
