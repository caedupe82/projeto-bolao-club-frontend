import { AvisoService } from './../../services/domain/aviso.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aviso } from './../../models/domain/aviso';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-cadastro-aviso',
  templateUrl: 'cadastro-aviso.html',
})
export class CadastroAvisoPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public storageService: StorageService,
    private avisoService: AvisoService) {

    this.formGroup = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]]
    });

  }

  aviso: Aviso = {};

  ionViewDidLoad() {
    if (this.validarUsuario()) {
      const codigo = this.navParams.get('id');
      if(codigo!= null) {
        let loading = this.loadingCtrl.create({
          content: 'Carregando Aviso...'
        });
        loading.present();
        this.avisoService.findOne(codigo).subscribe(res => {
          this.aviso = res;
          loading.dismiss();
        }, err => {
          loading.dismiss();
        });
      }
    }
  }

  getTitulo() {
    return this.aviso.codigo == null ? 'Cadastro de Aviso' : 'Edição de Aviso';
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

  salvar() {
    if (this.validarUsuario()) {
      let loading = this.loadingCtrl.create({
        content: 'Salvando Aviso...'
      });
      loading.present();

      this.avisoService.insert(this.aviso).subscribe(res => {
        this.montarToast('Aviso salvo com sucesso!');
        this.navCtrl.setRoot('ListagemAvisoPage');
        loading.dismiss();
      }, err => {
        this.montarToast(err.error);
        loading.dismiss();
      });
    }
  }

}