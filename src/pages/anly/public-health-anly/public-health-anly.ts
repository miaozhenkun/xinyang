import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PublicHealthAnlyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-public-health-anly',
  templateUrl: 'public-health-anly.html',
})
export class PublicHealthAnlyPage {
  option;
  option1;
  option2;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let data=[];
    let data1=[{"TOTALNUM":0,"NAME":"0-3岁儿童"},{"TOTALNUM":0,"NAME":"65岁以上老年人"},{"TOTALNUM":35,"NAME":"传染病患者"},{"TOTALNUM":35,"NAME":"高血压患者"},{"TOTALNUM":35,"NAME":"糖尿病患者"},{"TOTALNUM":35,"NAME":"孕产妇"},{"TOTALNUM":35,"NAME":"重型精神病患者"}];
    for(var i in data1){
      data.push({name:data1[i].NAME,value:data1[i].TOTALNUM});
    }
    this.option = {
      title : {
        text: '建档量概况分析',
        position: 'center'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['建档量','建档率'],
        // orient: 'vertical',
        left: 'center',
        top:'bottom',
      },
      toolbox: {
        show : true,
        feature : {
          dataView : {show: true, readOnly: false},
          magicType : {show: true, type: ['line', 'bar']},
          restore : {show: true},
          // saveAsImage : {show: true}
        }
      },
      calculable : true,
      xAxis : [
        {
          type : 'category',
          data : ['舞钢市','宝丰县','郏县','鲁山县','叶县','新华区','卫东区','湛河区','石龙区']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'建档量',
          type:'bar',
          data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4],
          markPoint : {
            data : [
              {type : 'max', name: '最大值'},
              {type : 'min', name: '最小值'}
            ]
          },
          markLine : {
            data : [
              {type : 'average', name: '平均值'}
            ]
          }
        },
        {
          name:'建档率',
          type:'bar',
          data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0],
          markPoint : {
            data : [
              {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
              {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
            ]
          },
          markLine : {
            data : [
              {type : 'average', name : '平均值'}
            ]
          }
        }
      ]
    };

    this.option1 = {
      title : {
        text: '性别构成分析',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        data: ['男','女','未填写'],
        left: 'center',
        top:'bottom',
      },
      toolbox: {
        show : true,
        feature : {
          dataView : {show: true, readOnly: false},
        }
      },
      calculable : true,
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series : [
        {
          name: '构成分析',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],

          label: {
            normal: {
              // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              formatter: '{b|{b}}  {per|{d}%}',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },

          data:[
            {value:335, name:'男'},
            {value:310, name:'女'},
            {value:100, name:'未填写'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    console.log(data);

    this.option2={
      title : {
        text: '特殊人群构成分析',
        position: 'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
      },
      toolbox: {
        show : true,
        feature : {
          dataView : {show: true, readOnly: false},
        }
      },
      calculable : true,
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },

      series : [
        {
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          label: {
            normal: {
              // formatter: '{b|{b}}  {per|{d}%}',
              formatter: '{b}{per|{d}%}',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },

          data:data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]

    };


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicHealthAnlyPage');
  }

}
