import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  irPaginaMeuPalpite() {
    this.navCtrl.setRoot('MeuPalpitePage');
  }

  irPaginaContato() {
    this.navCtrl.setRoot('ContatoPage');
  }

  irPaginaAviso() {
    this.navCtrl.setRoot('AvisosPage');
  }

}
