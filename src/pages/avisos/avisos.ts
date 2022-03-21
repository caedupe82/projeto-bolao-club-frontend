import { StorageService } from './../../services/storage.service';
import { AvisoService } from './../../services/domain/aviso.service';
import { Aviso } from './../../models/domain/aviso';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-avisos',
  templateUrl: 'avisos.html',
})
export class AvisosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadingCtrl: LoadingController, private avisoService: AvisoService,
  public storageService: StorageService) {
  }

  listAviso: Aviso[] = [];

  ionViewDidLoad() {
    if (this.validarUsuario()) {
      this.buscarAvisos();
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

  buscarAvisos() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando Aviso...'
    });
    loading.present();
    this.avisoService.findAll().subscribe(res => {
      this.listAviso = res;
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
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
