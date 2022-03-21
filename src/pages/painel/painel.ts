import { StorageService } from './../../services/storage.service';
import { PainelUsuario } from './../../models/domain/painel-usuario';
import { PainelService } from './../../services/domain/painel.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-painel',
  templateUrl: 'painel.html',
})
export class PainelPage {

  painelUsuario: PainelUsuario = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController, public painelService: PainelService,
    public storageService: StorageService) {
  }

  ionViewDidLoad() {
    if (this.validarUsuario()) {
      let loading = this.loadingController.create({
        content: 'Carregando Painel...'
      });
      loading.present();
      this.painelService.findOnePainelUsuario().subscribe(res => {
        this.painelUsuario = res;
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
    }
  }

  ionViewCanEnter() {

    let usuarioPagou = this.storageService.getUsuarioPagou();

    if (usuarioPagou == "false") {
      alert('Só é possível entrar nas telas após realizar o pagamento do sistema.');
      this.navCtrl.setRoot('ContatoPage');
    }

    return usuarioPagou;
  }

  private validarUsuario() {
    if (!window.localStorage.getItem('localUser')) {
      alert('Por favor entre novamente no sistema.');
      this.navCtrl.setRoot('LogoutPage');
      return false;
    } else {
      return true;
    }
  }

}
