import { PalpiteService } from './../../services/domain/palpite.service';
import { Palpite } from './../../models/domain/palpite';
import { Numero } from './../../models/numero.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-meu-palpite',
  templateUrl: 'meu-palpite.html',
})
export class MeuPalpitePage {

  DEFAULT_BACKGROUND_NUMBER: string = 'numero-nao-selecionado';
  COR_SELECIONADO: string = 'numero-selecionado';
  COR_ACERTO: string = 'cor-acerto';
  COR_NAO_ACERTO: string = 'cor-nao-acerto';
  MENSAGEM_COMPROVANTE_MENSAL: string = 'Não é possível modificar o Meu Palpite sem enviar o comprovante mensal.';
  MENSAGEM_TERMOS_NAO_ACEITO: string = 'Termos de uso ainda não foi aceito.';

  listNumero: Numero[] = [];

  palpite: Palpite = {};

  contadorSelecionado = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public storageService: StorageService, public palpiteService: PalpiteService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    if (this.validarUsuario()) {
      this.listNumero = this.carregarNumeros();
      this.listNumero = this.carregarNumerosSelecionadorNoBanco(this.listNumero);
    }
  }

  private carregarNumerosSelecionadorNoBanco(listNumero: Numero[]) {
    let loading = this.loadingCtrl.create({
      content: 'Carregando Palpite...'
    });
    loading.present();

    const email = this.storageService.getEmail();

    this.palpiteService.findOneByEmail(email).subscribe((res: Palpite) => {

      this.palpite = res;
      
      if (res.numeros != null && res.numeros.length > 1) {
        let numerosDoBanco = res.numeros.split('-');

        for (let numero of listNumero) {

          if (numerosDoBanco.indexOf(numero.numero) > -1) {
            numero.selecionado = this.COR_SELECIONADO;
            if (this.palpite.numerosSorteados != null && this.palpite.numerosSorteados.includes(numero.numero)) {
              numero.selecionado = this.COR_ACERTO;
            }
            this.contadorSelecionado++;
          } else {
            if (this.palpite.numerosSorteados != null && this.palpite.numerosSorteados.includes(numero.numero)) {
              numero.selecionado = this.COR_NAO_ACERTO;
            }
          }

        }
      }
      
      this.palpite.fechamentoSistema = res.fechamentoSistema;
      loading.dismiss();
    }, err => {
      if (err.error == this.MENSAGEM_TERMOS_NAO_ACEITO) {
        this.navCtrl.setRoot('TermosDeUsoPage');
        window.localStorage.setItem('validar-termo', 'true');
      }

      if (err.error == this.MENSAGEM_COMPROVANTE_MENSAL) {
        alert(err.error);
        this.navCtrl.setRoot('ContatoPage');
      }
      loading.dismiss();
    });

    return listNumero;
  }

  private carregarNumeros(): Numero[] {

    for (let i = 1; i < 81; i++) {
      let numero: Numero = new Numero();
      numero.numero = this.completarCasa(i);
      numero.selecionado = this.DEFAULT_BACKGROUND_NUMBER;
      this.listNumero.push(numero);
    }

    return this.listNumero;
  }

  private completarCasa(numero: number): string {
    if (numero.toString().length == 1) {
      return "0".concat(numero.toString());
    }
    return numero.toString();
  }

  selecionarNumero(numero: Numero) {
    if (this.palpite.fechamentoSistema) {
      this.montarToast('Não é possível alterar o [Meu Palpite] antes da abertura do sistema ou após o fechamento do sistema.');
      return;
    } else if (this.palpite.numerosSorteados != null && this.palpite.numerosSorteados.length > 0) {
      this.montarToast('Não é possível alterar o [Meu Palpite] com o jogo já em andamento.');
      return;
    } else {
      if (numero.selecionado == this.COR_SELECIONADO) {
        numero.selecionado = this.DEFAULT_BACKGROUND_NUMBER;
        this.contadorSelecionado--;
      } else {
        if (this.contadorSelecionado < 20) {
          numero.selecionado = this.COR_SELECIONADO;
          this.contadorSelecionado++;
        } else {
          this.montarToast('Limite de número selecionado alcançado, por favor desmarque algum número.');
        }
      }
    }
  }

  salvar() {

    if (this.validarUsuario()) {
      let loading = this.loadingCtrl.create({
        content: 'Salvando Palpite...'
      })
      loading.present();

      this.palpite.email = this.storageService.getEmail();
      this.palpite.data = new Date();

      this.palpite.numeros = this.numerosSelecionadosParaSalvar();

      this.palpiteService.insert(this.palpite).subscribe(res => {
        this.montarToast('Palpite salvo com sucesso!');
        loading.dismiss();
      }, err => {
        this.montarToast(err.error);
        loading.dismiss();
      });
    }
  }

  private numerosSelecionadosParaSalvar() {
    let numerosParaSalvar: string = '';

    const list: Numero[] = this.listNumero.filter(numero => numero.selecionado === this.COR_SELECIONADO).sort();

    for (let x of list) {
      numerosParaSalvar += (x.numero + " - ");
    }

    return numerosParaSalvar.substr(0, numerosParaSalvar.length - 2);
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

  chamarSalvar(id: number) {
    if (this.contadorSelecionado < 20) {
      this.montarToast('Por favor selecionar vinte números, antes de salvar o jogo.');
      return;
    }

    if (this.validarUsuario()) {
      const prompt = this.alertCtrl.create({
        title: 'Confirmação',
        message: "Você tem certeza que são essas as dezenas que deseja salvar? " + this.palpite.numeros,
        buttons: [
          {
            text: 'Não'
          },
          {
            text: 'Sim',
            handler: data => {
              this.salvar();
            }
          }
        ]
      });
      prompt.present();
    }
  }
}
