import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export interface MenuItem {
    title: string;
    component: string;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'LoginPage';

  appMenuItemsUsuario: Array<MenuItem> = [
      {title: 'Painel', component: 'PainelPage', icon: 'desktop'},
      {title: 'Meu Palpite', component: 'MeuPalpitePage', icon: 'list-box'},
      {title: 'Resultados', component: 'ResultadoPage', icon: 'barcode'},
      {title: 'Ranking', component: 'RankingPage', icon: 'list'},
      {title: 'Prêmios', component: 'PremioPage', icon: 'ribbon'},
      {title: 'Fale Conosco', component: 'ContatoPage', icon: 'people'},
      {title: 'Avisos', component: 'AvisosPage', icon: 'eye'},
      {title: 'Termos de uso', component: 'TermosDeUsoPage', icon: 'information'},
      {title: 'Validar APP', component: 'ValidarAppPage', icon: 'thumbs-up'},
      {title: 'Sair', component: 'LogoutPage', icon: 'exit'}
  ];
  appMenuItemsAdmin: Array<MenuItem> = [
    {title: 'Painel Administrativo', component: 'PainelAdminPage', icon: 'desktop'},
    {title: 'Listar Participantes', component: 'ListagemUsuarioPage', icon: 'list-box'},
    {title: 'Validar Participante', component: 'RenovacaoUsuarioPage', icon: 'calculator'},
    {title: 'Listar Avisos', component: 'ListagemAvisoPage', icon: 'list-box'},
    {title: 'Enviar Avisos', component: 'CadastroAvisoPage', icon: 'eye'},
    {title: 'Resultado Manual', component: 'SincronizarResultadoPage', icon: 'clock'},
    {title: 'Sair', component: 'LogoutPage', icon: 'exit'}
  ];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
