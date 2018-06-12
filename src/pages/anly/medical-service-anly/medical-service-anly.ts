import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MedicalServiceAnlyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medical-service-anly',
  templateUrl: 'medical-service-anly.html',
})
export class MedicalServiceAnlyPage {
  option:any;
  option1:any;
  ischange:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.option = {
      tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: {formatter:'{value}%'},
          data: [{value: 50, name: '出院率'}]
        }
      ]
    }

    this.option1 = {
      // backgroundColor: "#cdcdcd",
      color: ['#ffd285', '#ff733f', '#ec4863'],

      title: [{
        text: '住院新增患者报表',
        left: '1%',
        top: '6%',
        textStyle: {
          color: '#333333'
        }
      }, {
        text: '',
        left: '83%',
        top: '6%',
        right:'20%',
        textAlign: 'center',
        textStyle: {
          color: '#cdcdcd'
        }
      }],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        x: 300,
        top: '7%',
        textStyle: {
          color: '#ffd285',
        },
        position: 'bottom',
        data: ['儿童', '成年人', '老年人']
      },
      grid: {
        left: '1%',
        right: '35%',
        top: '16%',
        bottom: '6%',
        containLabel: true
      },
      toolbox: {
        "show": false,
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        "axisLine": {
          lineStyle: {
            color: '#FF4500'
          }
        },
        "axisTick": {
          "show": false
        },
        axisLabel: {
          textStyle: {
            color: '#333333'
          }
        },
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        "axisLine": {
          lineStyle: {
            color: '#333333'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#333333'
          }
        },
        "axisTick": {
          "show": false
        },
        axisLabel: {
          textStyle: {
            color: '#333333'
          }
        },
        type: 'value'
      },
      series: [{
        name: '儿童',
        smooth: true,
        type: 'line',
        symbolSize: 8,
        symbol: 'circle',
        data: [90, 50, 39, 50, 120, 82, 80]
      }, {
        name: '成年人',
        smooth: true,
        type: 'line',
        symbolSize: 8,
        symbol: 'circle',
        data: [70, 50, 50, 87, 90, 80, 70]
      }, {
        name: '老年人',
        smooth: true,
        type: 'line',
        symbolSize: 8,
        symbol: 'circle',
        data: [290, 200,20, 132, 15, 200, 90]
      },
        // {
        //   type: 'pie',
        //   center: ['83%', '33%'],
        //   radius: ['25%', '30%'],
        //   label: {
        //     normal: {
        //       position: 'center'
        //     }
        //   },
        //   data: [{
        //     value: 335,
        //     name: '用户来源分析',
        //     itemStyle: {
        //       normal: {
        //         color: '#ffd285'
        //       }
        //     },
        //     label: {
        //       normal: {
        //         formatter: '{d} %',
        //         textStyle: {
        //           color: '#ffd285',
        //           fontSize: 20
        //
        //         }
        //       }
        //     }
        //   }, {
        //     value: 180,
        //     name: '占位',
        //     tooltip: {
        //       show: false
        //     },
        //     itemStyle: {
        //       normal: {
        //         color: '#87CEFA'
        //       }
        //     },
        //     label: {
        //       normal: {
        //         textStyle: {
        //           color: '#ffd285',
        //         },
        //         formatter: '\n农村户口'
        //       }
        //     }
        //   }]
        // },


        {
          type: 'pie',
          center: ['83%', '72%'],
          radius: ['25%', '30%'],
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 435,
            name: '用户来源分析',
            itemStyle: {
              normal: {
                color: '#ff733f'
              }
            },
            label: {
              normal: {
                formatter: '{d} %',
                textStyle: {
                  color: '#ff733f',
                  fontSize: 20

                }
              }
            }
          }, {
            value: 100,
            name: '占位',
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: '#87CEFA'


              }
            },
            label: {
              normal: {
                textStyle: {
                  color: '#FF4500',
                },
                formatter: '\n非农村户口'
              }
            }
          }]
        }]
    }



  }

  ionViewDidLoad() {
    let that =this;
    setInterval(function () {
      that.option.series[0].data[0].value =(Math.random() * 100).toFixed(1);
      that.ischange=!that.ischange;
    },2000)
  }

}
