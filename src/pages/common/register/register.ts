import { Component } from '@angular/core';
import {NavController, ViewController, IonicPage, ActionSheetController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { NativeService } from "../../../providers/NativeService";
import { UserService } from "../../../providers/UserService";

/**
 * 注册
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  // 定时器
  timer: any;
  // 表单
  registerForm: any;
  // 定时器计时
  time = 60;
  // 是否已获取验证码
  isrun: boolean = false;
  sex;
  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    public nativeService: NativeService,
    public actionSheetCtrl: ActionSheetController,
    public userService: UserService
  ) {

    this.registerForm = this.formBuilder.group({
      username: [, [Validators.required, Validators.pattern('[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+')]],
      codenum: [, [Validators.required]],
      phonenum: [, [Validators.required, Validators.pattern('1[0-9]{10}')]],
      password: [, [Validators.required]],
      sex: [,],
      realname: [, [Validators.required]],
      IDnumber: [, [Validators.required]],
      passportnum: [,],
      phoneNoOut: [,],
      email: [,],
    })

  };

  // 注册
  register() {

    if(this.registerForm.value.IDnumber.length!=18){
      this.nativeService.showToast('请正确输入身份证号');
      return;
    }
    this.registerForm.value.sex=this.sex;
    if (this.registerForm.value.sex == "男" || this.registerForm.value.sex == "女") {
      this.userService.checkUser({ username: this.registerForm.value.username })
        .subscribe(data => {
          this.userService.userRegist(this.registerForm.value).subscribe(result => {
            this.nativeService.showToast('注册成功');
            this.navCtrl.setRoot(LoginPage);
          })
        })
    } else {
      this.nativeService.showToast("请正确填写您的性别");
    }
  }

  // 关闭窗口
  dismiss() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.viewCtrl.dismiss();
  }

  // 获取验证码
  getCode() {
    if (!this.isrun) {
      let obj = {
        phonenum: this.registerForm.value.phonenum,
        timestamp: new Date().getTime()
      };
      this.userService.getUserSms(obj).subscribe(data => {
      });
      this.timer = setInterval(() => {
        this.time--;
        this.isrun = true;
        if (this.time == 0) {
          clearInterval(this.timer);
          this.time = 60;
          this.isrun = false;
        }
      }, 1000);
    }
  }

  // 页面销毁触发
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  confirm(){

  }

  // 选择性别
  sexActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择性别',
      buttons: [
        {
          text: '男',
          role: 'destructive',
          handler: () => {
            this.sex='男';
            this.registerForm.value.sex = '男';
          }
        }, {
          text: '女',
          handler: () => {
            this.sex='女';
            this.registerForm.value.sex = '女';
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

}
