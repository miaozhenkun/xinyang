import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeService} from "../../../providers/HomeService";

@IonicPage()
@Component({
  selector: 'page-relief-list-degtail',
  templateUrl: 'relief-list-degtail.html',
})
export class ReliefListDegtailPage {
  id;
  item;
  items;
  constructor(public navCtrl: NavController, public navParams: NavParams,public HomeService:HomeService) {
  }

  ionViewDidEnter() {

  }
  ionViewDidLoad() {
    this.id = this.navParams.data.id;
    this.HomeService.getTfIntenareliefDetails({id:this.id}).subscribe(data=>{
      this.item=data[0];
    });
    this.HomeService.getTfIntenareliefFbList({reliefId:this.id}).subscribe(data=>{
      this.items=data;
    })
  }
  goDegtail(item){
    this.navCtrl.push('ReliefDegtailPage',{id:item.id});
  }
}
