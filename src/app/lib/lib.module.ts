import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WebcamModule } from 'ngx-webcam';

import { TakePhotoComponent } from './components/take-photo/take-photo.component';

@NgModule({
  declarations: [
    TakePhotoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    WebcamModule
  ],
  exports: [
    TakePhotoComponent,
  ]
})
export class LibModule { }
