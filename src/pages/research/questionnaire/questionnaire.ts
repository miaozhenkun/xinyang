import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QuestionnairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questionnaire',
  templateUrl: 'questionnaire.html',
})
export class QuestionnairePage {
  isOne=true;
  option;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.option = {
      title : {
        text: '调查结果',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['清楚','知道一些','不清楚']
      },
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:336, name:'清楚'},
            {value:310, name:'知道一些'},
            {value:54, name:'不清楚'},
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
    console.log('ionViewDidLoad QuestionnairePage');
  }
  submit(){
    //this.navCtrl.pop();
    this.isOne=!this.isOne;
  }

}
