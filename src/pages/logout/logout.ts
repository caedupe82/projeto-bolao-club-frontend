import { AuthService } from './../../services/domain/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
  }

  ionViewDidLoad() {
    this.authService.logout();
    this.navCtrl.setRoot('LoginPage');
  }

}
