import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SincronizarResultadoPage } from './sincronizar-resultado';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    SincronizarResultadoPage
  ],
  imports: [
  IonicPageModule.forChild(SincronizarResultadoPage),
    BrMaskerModule
  ],
})
export class SincronizarResultadoPageModule {}
