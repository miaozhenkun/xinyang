import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-comprehensive-anly',
  templateUrl: 'comprehensive-anly.html',
})
export class ComprehensiveAnlyPage {
  config:any;
  option:any;
  option1:any;
  cheight=260;
  ischange:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.config={
      title: {
        text: '人口概况'
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['男', '女']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis:   {
        type : 'value'
      },
      yAxis: {
        type : 'category',
        axisTick : {show: false},
        data : ['0','10','20','30','40','50','60','70','80','90','100']
      },
      series: [
        {
          name:'男',
          type:'bar',
          stack: '总数',
          label: {
            normal: {
              show: true,
            }
          },
          data:[]
        },
        {
          name:'女',
          type:'bar',
          stack: '总数',
          label: {
            normal: {
              show: true,
            }
          },
          data:[]
        }
      ]
    };


    this.option = {
      title: {
        text: '出生规模分析'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        data:['一孩','二孩','多孩']
      },
      series: [
        {
          name:'家庭孩子分析',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          data:[
            {value:335, name:'一孩'},
            {value:310, name:'二孩'},
            {value:234, name:'多孩'},
          ]
        }
      ]
    };

  }

  ionViewDidLoad() {
    let that=this;
    setTimeout(function () {
      that.ischange=!that.ischange;
      that.config.series[0].data=[320, 302, 341, 374, 390, 450, 420,380,366,352];
      that.config.series[1].data=[120, 132, 101, 134, 190, 230, 210,110,50,60];
    },1000);
  }

}
