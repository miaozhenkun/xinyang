import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AccessOrgStatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-access-org-state',
  templateUrl: 'access-org-state.html',
})
export class AccessOrgStatePage {
  items;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items=[
      {num:"123245361",name:"信阳市中心医院",liantong:"1",kaiguan:"1",qiting:"1"},
      {num:"123245361",name:"信阳市卫生和计划生育委员会",liantong:"1",kaiguan:"1",qiting:"1"},
      {num:"123245361",name:"信阳市卫生和计划生育委员会基层",liantong:"1",kaiguan:"1",qiting:"1"},
      {num:"123245361",name:"信阳市第一人民医院",liantong:"1",kaiguan:"1",qiting:"1"},
      {num:"123245361",name:"信阳市第二人民医院",liantong:"1",kaiguan:"1",qiting:"1"},
      {num:"123245361",name:"信阳市第二中医院",liantong:"1",kaiguan:"1",qiting:"1"},
    ];
  }

}
