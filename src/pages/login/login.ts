import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, Platform, ToastController} from 'ionic-angular';
import Parse from 'parse';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;
  password: string;
  email: string;
  isSigningup: boolean;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {

  }

  signUp() {
    Parse.User.signUp(this.username, this.password, {email: this.email}).then((resp) => {
      console.log('Signed up successfully', resp);

      // Clears up the form
      this.username = '';
      this.password = '';
      this.email = '';

      this.toastCtrl.create({
        message: 'Account created successfully',
        duration: 2000
      }).present();

      this.isSigningup = false;
    }, err => {
      console.log('Error signing in', err);

      this.toastCtrl.create({
        message: err.message,
        duration: 2000
      }).present();
    });
  }

  signIn() {
    Parse.User.logIn(this.username, this.password).then((user) => {
      console.log('Logged in successfully', user);

      if(user.get('emailVerified')) {
        // If you app has Tabs, set root to TabsPage
        this.navCtrl.setRoot('HomePage')
      } else {
        Parse.User.logOut().then((resp) => {
          console.log('Logged out successfully', resp);
        }, err => {
          console.log('Error logging out', err);
        });

        this.alertCtrl.create({
          title: 'E-mail verification need',
          message: 'Your e-mail address must be verified before logging in.',
          buttons: ['Ok']
        }).present();
      }
    }, err => {
      console.log('Error logging in', err);

      this.toastCtrl.create({
        message: err.message,
        duration: 2000
      }).present();
    });
  }
}
