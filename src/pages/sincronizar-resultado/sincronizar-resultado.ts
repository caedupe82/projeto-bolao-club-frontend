import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Resultado } from '../../models/domain/resultado';
import { ResultadoService } from '../../services/domain/resultado.service';

@IonicPage()
@Component({
  selector: 'page-sincronizar-resultado',
  templateUrl: 'sincronizar-resultado.html',
})
export class SincronizarResultadoPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public resultadoService: ResultadoService,
    public alertController: AlertController) {

    this.formGroup = this.formBuilder.group({
      numeroConcurso: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      primeiroNumero: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      segundoNumero: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      terceiroNumero: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      quartoNumero: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      quintoNumero: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
    });

  }

  resultado: Resultado = {};

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

  salvar() {
    const alert = this.alertController.create({
      title: 'Confirmação:',
      message: 'Você tem certeza que são esses os números: ' + this.resultado.primeiroNumero + '-' + 
      this.resultado.segundoNumero + '-' + this.resultado.terceiroNumero + '-' +
      this.resultado.quartoNumero + '-' + this.resultado.quintoNumero + ' que forão sorteados no concurso ' +
      this.resultado.numeroConcurso + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.callSalvar();
          },
          cssClass: 'primary'
        }
      ]
    });

    alert.present();
  }

  callSalvar() {
    if (this.validarUsuario()) {
      let loading = this.loadingCtrl.create({
        content: 'Sincronizando resultado do dia...'
      });
      loading.present();

      this.resultadoService.insert(this.resultado).subscribe(res => {
        this.montarToast('Resultado sincronizado com sucesso!');
        this.navCtrl.setRoot('SincronizarResultadoPage');
        loading.dismiss();
      }, err => {
        this.montarToast(err.error);
        loading.dismiss();
      });
    }
  }

}
