import { Component } from '@angular/core';
import { ViewController, IonicPage } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from "../../../providers/UserService";
import { NativeService } from "../../../providers/NativeService";

/**
 * 找回密码
 */
@IonicPage()
@Component({
  selector: 'page-find-password',
  templateUrl: 'find-password.html'
})
export class FindPasswordPage {

  // 短信发送计时定时器
  timer: any;
  // 短信发送定时时间
  time = 60;
  // 表单
  findPasswordForm: any;
  // 是否已获取验证码
  isrun: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    public userService: UserService,
    public nativeService: NativeService, ) {

    this.findPasswordForm = this.formBuilder.group({
      username: [, [Validators.required]],
      phonenum: [, [Validators.required, Validators.minLength(11), Validators.pattern('1[0-9]{10}')]],
      codenum: [, [Validators.required, Validators.minLength(6), Validators.pattern('[0-9]{6}')]],
      password: [, [Validators.required, Validators.minLength(6)]]
    });

  };

  // 提交
  submit() {
    this.userService.resetPwd(this.findPasswordForm.value).subscribe(result => {
      this.nativeService.showToast('密码重置成功');
      this.dismiss();
    });
  }

  // 关闭窗口
  dismiss() {
    this.viewCtrl.dismiss();
  }

  // 获取验证码
  getCode() {
    if(this.findPasswordForm.value.phonenum){
      if(this.findPasswordForm.value.phonenum.length!=11){
        this.nativeService.showToast('检查手机号是否输入正确');
        return;
      }
      if (!this.isrun) {
        let obj = {
          phonenum: this.findPasswordForm.value.phonenum,
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
    }else {
      this.nativeService.showToast('检查手机号是否输入正确');
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

}
