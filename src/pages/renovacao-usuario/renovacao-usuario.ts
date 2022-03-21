import { RenovacaoList } from './../../models/list/renovacao-list';
import { RenovacaoService } from './../../services/domain/renovacao.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-renovacao-usuario',
  templateUrl: 'renovacao-usuario.html',
})
export class RenovacaoUsuarioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: StorageService,
    private renovacaoService: RenovacaoService, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  listRenovacao: RenovacaoList[] = [];

  ionViewDidLoad() {
    if (this.validarUsuario()) {
      this.buscarRenovacao();
    }
  }

  buscarRenovacao() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando Renovações...'
    });
    loading.present();
    this.renovacaoService.findAll().subscribe(res => {
      this.listRenovacao = res;
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

  aprovar(renovacao: RenovacaoList) {
    if (this.validarUsuario()) {
      this.aprovarOuReprovar(renovacao, 'Aprovação');
    }
  }

  reprovar(renovacao: RenovacaoList) {
    if (this.validarUsuario()) {
      this.showPromptReprovacao(renovacao);
    }
  }

  showPromptReprovacao(renovacao: RenovacaoList) {
    const prompt = this.alertCtrl.create({
      title: 'Motivo de Reprovação',
      message: "Por favor informe o motivo de reprovação do pagamento",
      inputs: [
        {
          name: 'motivo',
          placeholder: 'Motivo'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Reprovar',
          handler: data => {
            renovacao.motivo = data.motivo;
            if (renovacao.motivo != null && renovacao.motivo.length > 0) {
              this.aprovarOuReprovar(renovacao, 'Reprovação');
            } else {
              alert('Por favor preencha o campo Motivo da Reprovação');
            }
          }
        }
      ]
    });
    prompt.present();
  }

  aprovarOuReprovar(renovacao: RenovacaoList, acao: string) {
    if (this.validarUsuario()) {
      let loading = this.loadingCtrl.create({
        content: acao.concat(' renovação...')
      });
      loading.present();
      this.renovacaoService.aprovarOuReprovar(renovacao).subscribe(res => {
        this.montarToast(acao.concat(' renovação realizada com sucesso!'));
        this.buscarRenovacao();
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
    }
  }

  private montarToast(text: string) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });

    toast.present();
  }
}
