import { TabsPageModule } from './../tabs/tabs.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidarAppPage } from './validar-app';

@NgModule({
  declarations: [
    ValidarAppPage
  ],
  imports: [
    IonicPageModule.forChild(ValidarAppPage),
    TabsPageModule
  ],
})
export class ValidarAppPageModule {}
