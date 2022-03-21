import { Constants } from './../../config/constantes';
import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/domain/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  lembrarMe: Boolean = false;

  constructor(public navCtrl: NavController, private menu: MenuController, 
    private authService: AuthService, private storageService: StorageService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad(){
   
    if (window.localStorage.getItem('lembrar-me')) {
      const usuario = window.localStorage.getItem('lembrar-me').split('-');
      this.creds.email = usuario[0];
      this.creds.senha = usuario[1];
      this.lembrarMe = true; 
    }

  }

  entrar() {
    let loading = this.loadingCtrl.create({
      content: 'Realizando Login... Por favor aguarde!'
    });
    loading.present();
    this.authService.authenticate(this.creds).subscribe(response => {
      this.authService.loginSucess(response.headers.get('Authorization'));
      this.validarPermissaoUsuario();
      this.validarLembrarMe(this.creds);
      loading.dismiss();
    }, err => {
      alert('E-mail ou senha inválido!');
      loading.dismiss();
    });
  }

  esqueceuSenha() {
    this.navCtrl.push('EsqueceuSenhaPage');
  }

  cadastrar() {
    this.navCtrl.push('CadastroPage');
  }
  
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    const token = window.localStorage.getItem('localUser');
    if (token) {
      this.validarPermissaoUsuario();
    }
  }

  validarPermissaoUsuario() {
    if (this.storageService.getPermissao() == Constants.USUARIO) {
      this.menu.enable(true, 'usuario');
      this.menu.enable(false, 'administrador');
      this.navCtrl.setRoot('MeuPalpitePage');
    } else {
      this.menu.enable(false, 'usuario');
      this.menu.enable(true, 'administrador');
      this.navCtrl.setRoot('ListagemUsuarioPage');
    }
  }

  validarLembrarMe(creds: CredenciaisDTO) {
      if (this.lembrarMe) {
        window.localStorage.setItem('lembrar-me', creds.email + '-' + creds.senha);
      } else {
        if (window.localStorage.getItem('lembrar-me')) {
          window.localStorage.removeItem('lembrar-me');
        }
      }
  }

}
