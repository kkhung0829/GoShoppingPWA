import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WebcamModule } from 'ngx-webcam';

import { TakePhotoComponent } from './components/take-photo/take-photo.component';
import { AnimateNumberComponent } from './components/animate-number/animate-number.component';
import { ExifTagsDirective } from './directives/exif-tags.directive';

@NgModule({
  declarations: [
    TakePhotoComponent,
    AnimateNumberComponent,
    ExifTagsDirective,
  ],
  imports: [
    CommonModule,
    IonicModule,
    WebcamModule
  ],
  exports: [
    TakePhotoComponent,
    AnimateNumberComponent,
    ExifTagsDirective,
  ]
})
export class LibModule { }
