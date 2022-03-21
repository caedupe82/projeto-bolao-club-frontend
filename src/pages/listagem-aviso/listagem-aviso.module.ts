import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemAvisoPage } from './listagem-aviso';

@NgModule({
  declarations: [
    ListagemAvisoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListagemAvisoPage),
  ],
})
export class ListagemAvisoPageModule {}
