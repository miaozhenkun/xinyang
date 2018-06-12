import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {BadgeSinhService} from "../../providers/BadgeSinhService";
import {ResearchPage} from "../research/research";
import {MonitorPage} from "../monitor/monitor";
/**
 * 底部导航
 */
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  tab1Root = 'HomePage';
  tab2Root = 'ResearchPage';
  tab3Root = 'MonitorPage';
  tab4Root = 'AnlyPage';
  tab5Root = 'UserCenterPage';
  constructor(public events: Events,public  badge:BadgeSinhService) {

  }
  ionViewDidEnter() {
  }
  ionChange(){
  }
  ionSelect(){
  }

}
