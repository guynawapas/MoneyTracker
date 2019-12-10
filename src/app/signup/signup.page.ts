import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  account = { email: '', password1: '', password2: '' };
  constructor( private userService: UserService,
               private toastCtrl: ToastController,
               public router: Router ) { }

  ngOnInit() {
  }

  doSignup() {
    if ((this.account.email == '') || (this.account.password1 == '')) {
      this.presentToast("Email & password are required.");
      return false;
    }
    if (this.account.password1 == this.account.password2) {
      console.log(this.account);

      this.userService.signup(this.account.email, this.account.password1)
        .then(data => {
          console.log(data);
          this.presentToast("Account created. Please login.");
          // this.navCtrl.navigateBack('/login');
          this.router.navigateByUrl('/login');
        })
        .catch(error => {
          console.log(error);
          this.presentToast(error.message);
        });
    } else {
      this.presentToast("Passwords must match.");
      return false;
    }
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  gotoLogin() {
    this.router.navigateByUrl('/login');
  }

}