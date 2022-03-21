import { TabsPageModule } from './../tabs/tabs.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvisosPage } from './avisos';

@NgModule({
  declarations: [
    AvisosPage,
  ],
  imports: [
    IonicPageModule.forChild(AvisosPage),
    TabsPageModule
  ],
})
export class AvisosPageModule {}
