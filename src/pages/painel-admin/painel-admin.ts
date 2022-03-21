import { Mes } from './../../models/domain/mes';
import { DateUtil } from './../../utils/date-util';
import { PainelService } from './../../services/domain/painel.service';
import { Painel } from './../../models/domain/painel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-painel-admin',
  templateUrl: 'painel-admin.html',
})
export class PainelAdminPage {

  formGroup: FormGroup;
  painel: Painel = {};
  anoReferencia = '2019';

  recuperarMeses: Mes[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public painelService: PainelService, public toastCtrl: ToastController) {
    this.formGroup = this.formBuilder.group({
      valorCota: [50.0, [Validators.required]],
      premioPrincipal: [40.0, [Validators.required, Validators.min(0), Validators.max(100)]],
      premioSecundario: [20.0, [Validators.required, Validators.min(0), Validators.max(100)]],
      premioPeFrio: [10.0, [Validators.required, Validators.min(0), Validators.max(100)]],
      premioAcumulado: [0.0, [Validators.required, Validators.min(0)]],
      taxaAdministrativa: [20.0, [Validators.required, Validators.min(0), Validators.max(100)]],
      aberturaSistema: [new Date().toLocaleDateString(), [Validators.required]],
      fechamentoSistema: [new Date().toLocaleDateString(), [Validators.required]],
      primeiroSorteio: [new Date().toLocaleDateString(), [Validators.required]],
      totalParticipantes: [5],
      mesReferencia: [Validators.required]
    });
  }

  selecionouValor() {
    this.painelService.findOnePainelPorData(this.painel.mesReferencia).subscribe(res => {
      this.painel = JSON.parse(res.body);
    }, err => {
    });
  }

  ionViewDidLoad() {
    this.anoReferencia = new Date().getFullYear().toString();
    this.recuperarMeses = this.getMes(this.anoReferencia);
    if (this.validarUsuario()) {
      let loading = this.loadingCtrl.create({
        content: 'Carregando Painel...'
      });
      loading.present();
      this.painelService.findOne().subscribe((res: Painel) => {
        loading.dismiss();
        this.painel = res;
        this.painel.aberturaSistema = DateUtil.converterData(this.painel.aberturaSistema);
        this.painel.primeiroSorteio = DateUtil.converterData(this.painel.primeiroSorteio);
        this.painel.fechamentoSistema = DateUtil.converterData(this.painel.fechamentoSistema);
      }, err => {
        loading.dismiss();
      });
    }
  }

  getMes(x: string): Mes[] {
    this.recuperarMeses.push({
      ano: '01/01/'.concat(x),
      valor: '01/01/'.concat(x)
    });
    this.recuperarMeses.push({
      ano: '01/02/'.concat(x),
      valor: '01/02/'.concat(x)
    });
    this.recuperarMeses.push({
      ano: '01/03/'.concat(x),
      valor: '01/03/'.concat(x)
    });
    this.recuperarMeses.push({
      ano: '01/04/'.concat(x),
      valor: '01/04/'.concat(x)
    });
    this.recuperarMeses.push({
      ano: '01/05/'.concat(x),
      valor: '01/05/'.concat(x)
    });
    this.recuperarMeses.push({
      ano: '01/06/'.concat(x),
      valor: '01/06/'.concat(x)
    });
    this.recuperarMeses.push({
      ano: '01/07/'.concat(x),
      valor: '01/07/'.concat(x)
    });
    this.recuperarMeses.push({
      ano: '01/08/'.concat(x),
      valor: '01/08/'.concat(x)
    });
    this.recuperarMeses.push({
      ano: '01/09/'.concat(x),
      valor: '01/09/'.concat(x)
    });
    this.recuperarMeses.push({
      ano: '01/10/'.concat(x),
      valor: '01/10/'.concat(x)
    });
    this.recuperarMeses.push({
      ano: '01/11/'.concat(x),
      valor: '01/11/'.concat(x)
    });
    this.recuperarMeses.push({
      ano: '01/12/'.concat(x),
      valor: '01/12/'.concat(x)
    });
    return this.recuperarMeses;
  }

  salvar() {
    if (this.validarUsuario()) {
      let loading = this.loadingCtrl.create({
        content: 'Salvar Painel...'
      });
      loading.present();

      if (this.painel.valorCota != null) {
        this.painel.valorCota = Number.parseFloat(this.painel.valorCota.toString().replace(',', '.'));
      }

      if (this.painel.premioPrincipal != null) {
        this.painel.premioPrincipal = Number.parseFloat(this.painel.premioPrincipal.toString().replace(',', '.'));
      }

      if (this.painel.premioSecundario != null) {
        this.painel.premioSecundario = Number.parseFloat(this.painel.premioSecundario.toString().replace(',', '.'));
      }

      if (this.painel.premioPeFrio != null) {
        this.painel.premioPeFrio = Number.parseFloat(this.painel.premioPeFrio.toString().replace(',', '.'));
      }

      if (this.painel.premioAcumulado != null) {
        this.painel.premioAcumulado = Number.parseFloat(this.painel.premioAcumulado.toString().replace(',', '.'));
      }

      if (this.painel.taxaAdministrativa != null) {
        this.painel.taxaAdministrativa = Number.parseFloat(this.painel.taxaAdministrativa.toString().replace(',', '.'));
      }

      this.painelService.insert(this.painel).subscribe(res => {
        this.montarToast('Painel administrativo atualizado com suceso!');
        this.navCtrl.setRoot('PainelAdminPage');
        loading.dismiss();
      }, err => {
        this.montarToast(err.error);
        loading.dismiss();
      });
    }
  }

  getPremioPrincipal() {
    return (this.painel.totalParticipantes * this.painel.valorCota) * (this.painel.premioPrincipal / 100);
  }

  getPremioSecundario() {
    return (this.painel.totalParticipantes * this.painel.valorCota) * (this.painel.premioSecundario / 100);
  }

  getPremioPeFrio() {
    return (this.painel.totalParticipantes * this.painel.valorCota) * (this.painel.premioPeFrio / 100);
  }

  getTaxaAdministrativa() {
    return (this.painel.totalParticipantes * this.painel.valorCota) * (this.painel.taxaAdministrativa / 100);
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

  private montarToast(text: string) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });

    toast.present();
  }

}