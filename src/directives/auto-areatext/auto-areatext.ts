import { Directive, ElementRef, HostListener,Input, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';

/**
 * 文本域自适应高度(自定义指令)
 */
@Directive({ selector: '[autoAreatext]' })
export class AutoAreatextDirective {

  // 最小高度
  minHeight:string;

  // 高度
  @Input('autoAreatext') height: string;

  constructor(
    private el: ElementRef, 
    private renderer: Renderer, 
    public platform: Platform) {
    this.platform.ready().then(() => {
      this.minHeight = el.nativeElement.clientHeight;
    });
  }

  // 自适应
  auto(){
    if(!this.minHeight){
      return false;
    }
    this.renderer.setElementStyle(this.el.nativeElement, 'height', this.minHeight+'px');
    if(this.el.nativeElement.scrollHeight>this.minHeight){
      this.renderer.setElementStyle(this.el.nativeElement, 'height', this.el.nativeElement.scrollHeight+'px');
      this.renderer.setElementStyle(this.el.nativeElement, 'overflow', 'hidden');
    }
  }

  // 监听-粘贴
  @HostListener('paste') onPaste() {
    this.auto();
  }

  // 监听-剪切
  @HostListener('cut') onCut() {
    this.auto();
  }

  // 监听-按键按下
  @HostListener('keydown') onKeydown() {
    this.auto();
  }

  // 监听-按键释放
  @HostListener('keyup') onKeyup() {
    this.auto();
  }

  // 监听-获取焦点
  @HostListener('focus') onFocus() {
    this.auto();
  }

  // 监听-丢失焦点
  @HostListener('blur') onBlur() {
    this.auto();
  }

}
