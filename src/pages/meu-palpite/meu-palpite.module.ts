import { TabsPageModule } from './../tabs/tabs.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeuPalpitePage } from './meu-palpite';

@NgModule({
  declarations: [
    MeuPalpitePage,
  ],
  imports: [
    IonicPageModule.forChild(MeuPalpitePage),
    TabsPageModule
  ],
})
export class MeuPalpitePageModule {}
