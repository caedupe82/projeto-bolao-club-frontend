import { AvisoService } from './../../services/domain/aviso.service';
import { StorageService } from './../../services/storage.service';
import { Aviso } from './../../models/domain/aviso';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-listagem-aviso',
  templateUrl: 'listagem-aviso.html',
})
export class ListagemAvisoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: StorageService,
    private avisoService: AvisoService, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  listAviso: Aviso[] = [];

  ionViewDidLoad() {
    if (this.validarUsuario()) {
      this.buscarAvisos();
    }
  }

  buscarAvisos() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando Avisos...'
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

  excluir(id: number) {
    if (this.validarUsuario()) {
      const prompt = this.alertCtrl.create({
        title: 'Excluir',
        message: "Deseja realmente excluir esse aviso?",
        buttons: [
          {
            text: 'Cancelar'
          },
          {
            text: 'OK',
            handler: data => {
              let loading = this.loadingCtrl.create({
                content: 'Excluindo Aviso...'
              });
              loading.present();
              this.avisoService.excluir(id).subscribe(res => {
                this.montarToast('Aviso excluído com sucesso!');
                this.buscarAvisos();
                loading.dismiss();
              }, err => {
                loading.dismiss();
              });
            }
          }
        ]
      });
      prompt.present();
    }
  }

  private montarToast(text: string) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });

    toast.present();
  }

  editar(codigo: number) {
    this.navCtrl.setRoot('CadastroAvisoPage', {id: codigo});
  }

  criarAviso() {
    this.navCtrl.setRoot('CadastroAvisoPage');
  }

}
