import { UsuarioService } from './../../services/domain/usuario.service';
import { Usuario } from './../../models/domain/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  formGroup: FormGroup;

  usuario: Usuario = {};
  confirmaSenha: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public toastCtrl: ToastController,
    private usuarioService: UsuarioService, public loadingCtrl: LoadingController) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apelido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmaSenha: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  cadastrar() {
    let loading = this.loadingCtrl.create({
      content: 'Salvando usuário...'
    });

    loading.present();

    if (this.usuario.senha !== this.confirmaSenha) {
      const toast = this.montarToast('A senha não foi confirmada corretamente.');
      toast.present();
      loading.dismiss();
    } else {
      this.usuarioService.insert(this.usuario).subscribe(res => {
        const toast = this.montarToast('Cadastro efetuado com sucesso!');
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
