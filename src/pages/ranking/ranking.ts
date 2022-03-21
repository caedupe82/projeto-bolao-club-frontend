import { StorageService } from './../../services/storage.service';
import { Ranking } from './../../models/ranking.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { PalpiteService } from '../../services/domain/palpite.service';

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {

  listRanking: Ranking[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public palpiteService: PalpiteService,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public storageService: StorageService) {
  }

  ionViewDidLoad() {
    if (this.validarUsuario()) {
      let loading = this.loadingCtrl.create({
        content: 'Buscando ranking...'
      });
      loading.present();

      this.palpiteService.findAllRankingByMesAndAno().subscribe(res => {
        this.listRanking = res;
        loading.dismiss();
      }, err => {
        loading.dismiss();
        this.montarToast('Ocorreu um erro ao tentar carregar o ranking.');
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
