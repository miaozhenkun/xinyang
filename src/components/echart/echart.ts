import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import * as echarts from 'echarts';
/**
 * @name echart 组件
 * @description  miao
 * @example   <echarts [config]="" [cheight]=""></echarts>
 */
@Component({
  selector: 'echarts',
  templateUrl: 'echart.html',
})
export class EchartComponent implements OnInit, OnChanges {
  @ViewChild('containerchart') container: ElementRef;
  @Input() config:any;//此为 echart 组件的配置项
  @Input() cheight:any;//设置  图表的高度
  @Input() ischange:boolean;//设置  图表的高度

  // @Output() pwdResult = new EventEmitter<any>();
  chart: any;
  constructor() {

  }
  ngOnInit(): void {
    //this.refresh();
  }
  ngOnChanges(changes: SimpleChanges)  {
    this.refresh();
  }

  refresh(){
    let ctx = this.container.nativeElement;
    if(this.cheight){
      ctx.style.height=this.cheight+'px';
    }
    //this.chart = echarts.init(ctx,'dark');
    this.chart = echarts.init(ctx);
    this.chart.setOption(this.config);
  }


}
