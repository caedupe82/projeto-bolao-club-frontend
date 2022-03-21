import { SolicitacaoRenovacao } from './../../models/email/solicitacao-renovacao.model';
import { StorageService } from './../../services/storage.service';
import { EmailService } from './../../services/email.service';
import { FaleConosco } from './../../models/email/fale-conosco.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})
export class ContatoPage {

  formGroupContato: FormGroup;

  faleConosco: FaleConosco = {};

  solicitacaoRenovacao: SolicitacaoRenovacao = {};
  picture: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public toastCtrl: ToastController,
    private emailService: EmailService, public loadingCtrl: LoadingController,
    private storageService: StorageService, public camera: Camera) {

    this.formGroupContato = this.formBuilder.group({
      assunto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      mensagem: ['', [Validators.required, Validators.minLength(3)]]
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

  enviarFaleConosco() {
    if (this.validarUsuario()) {
      let loading = this.loadingCtrl.create({
        content: 'Enviando mensagem de contato...'
      });
      loading.present();

      this.faleConosco.email = this.storageService.getEmail();

      this.emailService.faleConosco(this.faleConosco).subscribe(res => {
        this.montarToast('Mensagem enviada com sucesso!');
        loading.dismiss();
        this.formGroupContato.reset();
      }, err => {
        this.montarToast('Erro ao enviar mensagem!');
        loading.dismiss();
        this.formGroupContato.reset();
      });
    }
  }

  enviarRenovacao() {
    if (this.validarUsuario()) {
      if (this.picture == null) {
        alert('Por favor selecionar um arquivo para envio.');
      } else {
        this.solicitacaoRenovacao.email = this.storageService.getEmail();
        this.solicitacaoRenovacao.arquivo = this.picture;

        let loading = this.loadingCtrl.create({
          content: 'Enviando comprovante de renovação...'
        });
        loading.present();

        this.emailService.renovacao(this.solicitacaoRenovacao).subscribe(res => {
          this.montarToast(res.body);
          loading.dismiss();
        }, err => {
          loading.dismiss();
        });
      }
    }
  }

  getCameraPicture() {

    const options: CameraOptions = {
      quality: 50,
      targetWidth: 800,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.montarToast('Imagem selecionada.');
    }, (err) => {
    });
  }

  private montarToast(text: string) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });

    toast.present();
  }

}