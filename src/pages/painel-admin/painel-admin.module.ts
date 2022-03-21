import { BrMaskerModule } from 'brmasker-ionic-3';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PainelAdminPage } from './painel-admin';

@NgModule({
  declarations: [
    PainelAdminPage
  ],
  imports: [
    IonicPageModule.forChild(PainelAdminPage),
    BrMaskerModule
  ],
})
export class PainelAdminPageModule {}
