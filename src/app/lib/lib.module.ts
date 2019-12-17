import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WebcamModule } from 'ngx-webcam';

import { TakePhotoComponent } from './components/take-photo/take-photo.component';
import { ExifTagsDirective } from './directives/exif-tags.directive';

@NgModule({
  declarations: [
    TakePhotoComponent,
    ExifTagsDirective,
  ],
  imports: [
    CommonModule,
    IonicModule,
    WebcamModule
  ],
  exports: [
    TakePhotoComponent,
    ExifTagsDirective,
  ]
})
export class LibModule { }
