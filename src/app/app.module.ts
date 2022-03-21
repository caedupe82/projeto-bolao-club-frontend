import { PainelService } from './../services/domain/painel.service';
import { RenovacaoService } from './../services/domain/renovacao.service';
import { EmailService } from './../services/email.service';
import { AvisoService } from './../services/domain/aviso.service';
import { PalpiteService } from './../services/domain/palpite.service';
import { StorageService } from './../services/storage.service';
import { AuthService } from './../services/domain/auth.service';
import { UsuarioService } from './../services/domain/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { MyApp } from './app.component';
import { ResultadoService } from '../services/domain/resultado.service';
import { PremioService } from '../services/domain/premio.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Camera,
    SplashScreen,
    StatusBar,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UsuarioService,
    AuthService,
    StorageService,
    PalpiteService,
    AvisoService,
    { provide: LOCALE_ID, useValue: "pt-BR" },
    EmailService,
    RenovacaoService,
    PainelService,
    ResultadoService,
    PremioService
  ]
})
export class AppModule { }
