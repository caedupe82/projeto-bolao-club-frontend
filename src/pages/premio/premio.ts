import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Premio } from '../../models/domain/premio';
import { PremioService } from '../../services/domain/premio.service';

@IonicPage()
@Component({
  selector: 'page-premio',
  templateUrl: 'premio.html',
})
export class PremioPage {

  listPremio: Premio[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public premioService: PremioService,
    public loadingCtrl: LoadingController, public toastrController: ToastController,
    public storageService: StorageService) {
  }

  ionViewDidLoad() {
    if (this.validarUsuario()) {
      this.buscarPremios();
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

  buscarPremios() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando Prêmios...'
    });
    loading.present();
    this.premioService.findAll().subscribe(res => {
      this.listPremio = res;
      loading.dismiss();
    }, err => {
      this.montarToast('Ocorreu um erro ao buscar os prêmios.');
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

  private montarToast(text: string) {
    const toast = this.toastrController.create({
      message: text,
      duration: 3000
    });

    toast.present();
  }

}