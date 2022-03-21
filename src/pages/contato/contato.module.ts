import { TabsPageModule } from './../tabs/tabs.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContatoPage } from './contato';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    ContatoPage,
  ],
  imports: [
  IonicPageModule.forChild(ContatoPage),
    TabsPageModule
  ],
  providers: [
    Camera
  ]
})
export class ContatoPageModule {}
