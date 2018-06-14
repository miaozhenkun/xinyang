import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as echarts from 'echarts';

/**
 * Generated class for the MonitorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monitor',
  templateUrl: 'monitor.html',
})
export class MonitorPage {
  items;
  items1;
  items2;
  config;
  ischange;
  configone;
  option1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let one = {
      "name": "第一批",
      "children": [
        {
          "name": "信阳市中心医院", "children": [
            {"name": "移动专线已连通"},
            {"name": "一体机已部署"},
            {"name": "数据接口改造情况（已完成）"},
            {"name": "数据上传情况（已完成"},
            {"name": "已上传37种业务表"},
            {"name": "数据上数据量", "value": '30914568'},
            {"name": "目前上传情况（正常）"},
          ]
        },
        {
          "name": "信阳市中医院", "children": [
            {"name": "移动专线已连通"},
            {"name": "一体机已部署"},
            {"name": "数据接口改造情况（已完成）"},
            {"name": "数据上传情况（已完成"},
            {"name": "已上传37种业务表"},
            {"name": "数据上数据量", "value": '30914568'},
            {"name": "目前上传情况（正常）"},]
        },
        {
          "name": "信阳市第一人民医院", "children": [
            {"name": "移动专线已连通"},
            {"name": "一体机已部署"},
            {"name": "数据接口改造情况（已完成）"},
            {"name": "数据上传情况（已完成"},
            {"name": "已上传37种业务表"},
            {"name": "数据上数据量", "value": '30914568'},
            {"name": "目前上传情况（正常）"},]
        },
      ]
    }

    this.configone = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',

          data: [one],

          top: '1%',
          left: '12%',
          bottom: '1%',
          right: '32%',

          symbolSize: 7,

          label: {
            normal: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9
            }
          },

          leaves: {
            label: {
              normal: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            }
          },

          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    }


    this.option1 = {
      title: {
        text: '前置机联通状态',
        left: 'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: ['联通', '未启动','启动未联通']
      },
      series : [
        {
          type: 'pie',
          radius : '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data:[
            {
              value:1548,
              name: '联通',
            },
            {value:535, name: '未启动'},
            {value:535, name: '启动未联通'},
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

  }

  ionViewDidLoad() {
    this.items = [
      {
        name: "信阳市中心医院",
        jinzhan: "移动专线已连通",
        ready: "一体机已部署",
        anly: "已完成",
        upload: "已完成",
        beizhu: "已上传37种业务表",
        num: "30914568",
        state: "数据上传正常"
      },
      {
        name: "信阳市中医院",
        jinzhan: "vpn专线已连通",
        ready: "一体机已部署",
        anly: "已完成",
        upload: "已完成",
        beizhu: "已上传37种业务表",
        num: "3949344",
        state: "基本信息数据从2月24日开始中断，门诊和住院信息从1月22日中断"
      },
      {
        name: "信阳市第一人民医院",
        jinzhan: "移动专线已连通",
        ready: "一体机已部署",
        anly: "已完成",
        upload: "已完成",
        beizhu: "已上传37种业务表",
        num: "6793343",
        state: "数据上传正常"
      }
    ];
    this.items2 = [
      {
        name: "信阳市第二中医院",
        jinzhan: "专线已连通",
        ready: "前置机服务器已部署（接口方式改造）",
        anly: "已改造大部分业务",
        upload: "已完成",
        beizhu: "已上传23种业务表",
        num: "1047848",
        state: "数据上传正常"
      },
      {
        name: "平桥区中医院",
        jinzhan: "vpn专线已连通",
        ready: "一体机已部署",
        anly: "已改造大部分业务",
        upload: "已改造大部分业务",
        beizhu: "已上传27种业务表",
        num: "80467",
        state: "数据中断从3月开始中断"
      },
      {
        name: "罗山县中医院",
        jinzhan: "移动专线已连通",
        ready: "一体机到货(万达承建)",
        anly: "已完成大部分业务",
        upload: "已完成大部分业务",
        beizhu: "已上传16种业务表",
        num: "524670",
        state: "数据上传正常"
      },
    ];
    this.items1 = [
      {
        name: "信阳职业技术学院附属医院（第二人民医院）",
        jinzhan: "vpn专线已连通",
        ready: "一体机已部署",
        anly: "已完成",
        upload: "已完成",
        beizhu: "已上传37种业务表",
        num: "4938592",
        state: "数据上传从5月7号开始中断"
      },
      {
        name: "信阳市第三人民医院（陈工负责）",
        jinzhan: "vpn专线已连通",
        ready: "一体机已部署",
        anly: "已改造大部分业务",
        upload: "已改造大部分业务",
        beizhu: "已上传26种业务表",
        num: "4769344",
        state: "本周数据中断异常刚修复好，目前数据处于上传中。"
      },
      {
        name: "信阳市第四人民医院",
        jinzhan: "移动专线已连通",
        ready: "一体机到货(万达承建)",
        anly: "已完成大部分业务",
        upload: "已完成大部分业务",
        beizhu: "已上传19种业务表",
        num: "344137",
        state: "数据上传从5月21号开始中断"
      },
    ];
  }
}



