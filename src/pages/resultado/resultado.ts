import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ResultadoService } from '../../services/domain/resultado.service';
import { Resultado } from '../../models/domain/resultado';

@IonicPage()
@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html',
})
export class ResultadoPage {

  listResultado: Resultado[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public resultadoService: ResultadoService,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public storageService: StorageService) {
  }

  ionViewDidLoad() {
    if (this.validarUsuario()) {
      let loading = this.loadingCtrl.create({
        content: 'Buscando resultados...'
      });
      loading.present();

      this.resultadoService.findAllByMesAndAno().subscribe(res => {
        this.listResultado = res;
        loading.dismiss();
      }, err => {
        loading.dismiss();
        this.montarToast('Ocorreu um erro ao tentar carregar o resultado.');
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

  private montarToast(text: string) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });

    toast.present();
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