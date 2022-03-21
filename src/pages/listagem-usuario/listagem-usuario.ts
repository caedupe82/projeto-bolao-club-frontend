import { UsuarioService } from './../../services/domain/usuario.service';
import { StorageService } from './../../services/storage.service';
import { UsuarioList } from './../../models/list/usuario-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-listagem-usuario',
  templateUrl: 'listagem-usuario.html',
})
export class ListagemUsuarioPage {

  listUsuario: UsuarioList[] = []; 

  constructor(public navCtrl: NavController, public storageService: StorageService,
    private usuarioService: UsuarioService, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    if (this.validarUsuario()) {
      this.buscarUsuarios();
    }
  }

  private buscarUsuarios() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando Usuários...'
    });
    loading.present();
    this.usuarioService.findAll().subscribe(res => {
      this.listUsuario = res;
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
