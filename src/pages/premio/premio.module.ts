import { TabsPageModule } from './../tabs/tabs.module';
import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PremioPage } from './premio';

@NgModule({
  declarations: [
    PremioPage,
  ],
  imports: [
    IonicPageModule.forChild(PremioPage),
    PipesModule,
    TabsPageModule
  ],
})
export class PremioPageModule {}
