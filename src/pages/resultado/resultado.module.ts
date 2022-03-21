import { TabsPageModule } from './../tabs/tabs.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultadoPage } from './resultado';

@NgModule({
  declarations: [
    ResultadoPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultadoPage),
    TabsPageModule
  ],
})
export class ResultadoPageModule {}
