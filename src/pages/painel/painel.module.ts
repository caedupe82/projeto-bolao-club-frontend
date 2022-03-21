import { TabsPageModule } from './../tabs/tabs.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PainelPage } from './painel';

@NgModule({
  declarations: [
    PainelPage,
  ],
  imports: [
    IonicPageModule.forChild(PainelPage),
    TabsPageModule
  ],
})
export class PainelPageModule {}
