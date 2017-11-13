import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateadrPage } from './updateadr';

@NgModule({
  declarations: [
    UpdateadrPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateadrPage),
  ],
  exports: [
    UpdateadrPage
  ]
})
export class UpdateadrPageModule {}
