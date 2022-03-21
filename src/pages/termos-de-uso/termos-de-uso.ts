import { UsuarioService } from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-termos-de-uso',
  templateUrl: 'termos-de-uso.html',
})
export class TermosDeUsoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastController: ToastController, private usuarioService: UsuarioService,
    private storageService: StorageService, public loadingCtrl: LoadingController) {
  }

  validarTermo: boolean = false;

  ionViewDidLoad() {
    const validar = window.localStorage.getItem('validar-termo');
    if (validar === 'true') {
        this.validarTermo = true;
    }
  }

  naoConcordo() {
    alert('Para continuar utilizando o APP você deverá aceitar os termos de uso.');
    window.localStorage.removeItem('validar-termo');
    this.navCtrl.setRoot('LogoutPage');
  }

  concordo() {
    const email = this.storageService.getEmail();
    let loading = this.loadingCtrl.create({
      content: 'Aceitando termo de uso...'
    });
    loading.present();
    this.usuarioService.aceitarTermo(email).subscribe(res => {
      loading.dismiss();
      alert('Muito obrigado por aceitar os termos de uso do nosso aplicativo! :)');
      this.navCtrl.setRoot('MeuPalpitePage');
      window.localStorage.removeItem('validar-termo');
    }, err => {
      window.localStorage.removeItem('validar-termo');
      loading.dismiss();
    });
  }

}