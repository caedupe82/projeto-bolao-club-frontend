import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EsqueceuSenha } from '../../models/esqueceu-senha';
import { UsuarioService } from '../../services/domain/usuario.service';

@IonicPage()
@Component({
  selector: 'page-esqueceu-senha',
  templateUrl: 'esqueceu-senha.html',
})
export class EsqueceuSenhaPage {

  formGroup: FormGroup;

  esqueceuSenha: EsqueceuSenha = {};
  confirmaSenha: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public toastCtrl: ToastController,
    private usuarioService: UsuarioService, public loadingCtrl: LoadingController) {

    this.formGroup = this.formBuilder.group({
      apelido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmaSenha: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  trocarSenha() {
    let loading = this.loadingCtrl.create({
      content: 'Trocando senha do usuário...'
    });

    loading.present();

    if (this.esqueceuSenha.senha !== this.confirmaSenha) {
      const toast = this.montarToast('A senha não foi confirmada corretamente.');
      toast.present();
      loading.dismiss();
    } else {
      this.usuarioService.esqueceuSenha(this.esqueceuSenha).subscribe(res => {
        const toast = this.montarToast('Troca de senha efetuada com sucesso!');
        toast.present();
        loading.dismiss();
        this.navCtrl.setRoot('LoginPage');
      }, err => {
        const toast = this.montarToast(err.error);
        loading.dismiss();
        toast.present();
      });
    }
  }

  voltar() {
    this.navCtrl.setRoot('LoginPage');
  }

  montarToast(text: string) {
    return this.toastCtrl.create({
      message: text,
      duration: 3000
    });
  }

}
