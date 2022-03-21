import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EsqueceuSenhaPage } from './esqueceu-senha';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    EsqueceuSenhaPage
  ],
  imports: [
  IonicPageModule.forChild(EsqueceuSenhaPage),
    BrMaskerModule
  ]
})
export class EsqueceuSenhaPageModule {}
