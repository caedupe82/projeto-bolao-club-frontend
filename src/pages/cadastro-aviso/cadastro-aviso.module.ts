import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroAvisoPage } from './cadastro-aviso';

@NgModule({
  declarations: [
    CadastroAvisoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroAvisoPage),
  ],
})
export class CadastroAvisoPageModule {}
