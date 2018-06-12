// angular
import { NgModule, ErrorHandler} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

// ionic
import { IonicApp, IonicModule, IonicErrorHandler, Config } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

// ionic-native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { AppVersion } from '@ionic-native/app-version';
import { Toast } from '@ionic-native/toast';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ImagePicker } from '@ionic-native/image-picker';
import { Network } from '@ionic-native/network';
import { AppMinimize } from '@ionic-native/app-minimize';
import { SQLite } from '@ionic-native/sqlite';
import { Device } from '@ionic-native/device';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { PhotoViewer  } from '@ionic-native/photo-viewer';
import { IonJPushModule } from 'ionic2-jpush'

// 动画
import { ModalFromRightEnter, ModalFromRightLeave, ModalScaleEnter, ModalScaleLeave } from "./modal-transitions";

// 公共/模块组件
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

// 公共服务
import { GlobalData } from '../providers/GlobalData';
import { Logger } from "../providers/Logger";
import { NativeService } from "../providers/NativeService";
import { HttpMyNetService } from '../providers/HttpMyNetService';
import { StorageKVService } from '../providers/StorageKVService';
import { FileService } from '../providers/FileService';
import { ReportService } from '../providers/ReportService';
import {BadgeSinhService} from '../providers/BadgeSinhService';
// 业务服务
import { UserService } from "../providers/UserService";
import { HomeService } from "../providers/HomeService";
import { ImgService } from "../providers/ImgService";

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [

    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    IonJPushModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true', // 是否隐藏全部子页面tabs
      iconMode: 'ios',
      mode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      backButtonText: '',// 返回按钮文本
      preloadModules: true // 启用预加载
    }),
    IonicStorageModule.forRoot(
      {
        name: '__mydb',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
      }
    ),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Toast,
    File,
    FileTransfer,
    InAppBrowser,
    ImagePicker,
    Network,
    AppVersion,
    AppMinimize,
    SQLite,
    ScreenOrientation,
    PhotoViewer,
    Device,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NativeService,
    Logger,
    GlobalData,
    HttpMyNetService,
    StorageKVService,
    FileService,
    BadgeSinhService,
    ReportService,
    UserService,
    HomeService,
    ImgService

  ]
})
export class AppModule {

  constructor(public config: Config) {
    this.setCustomTransitions();
  }

  private setCustomTransitions() {
    this.config.setTransition('modal-from-right-enter', ModalFromRightEnter);
    this.config.setTransition('modal-from-right-leave', ModalFromRightLeave);
    this.config.setTransition('modal-scale-enter', ModalScaleEnter);
    this.config.setTransition('modal-scale-leave', ModalScaleLeave);
  }

}
