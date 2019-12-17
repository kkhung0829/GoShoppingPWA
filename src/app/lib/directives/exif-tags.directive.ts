import {
  Directive,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { Platform } from '@ionic/angular';

@Directive({
  selector: '[appExifTags]'
})
export class ExifTagsDirective implements OnInit {
  @Input('appExifTags') tags: object;

  @HostBinding('style.transform') transform: string;

  private isIOS: boolean;

  constructor(
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.isIOS = this.platform.is('ios');

    if (this.tags) {
      if (!this.isIOS) {  // IOS not need to handle orientation
        this.handleOrientation(this.tags['Orientation']);
      }
    }
  }

  private handleOrientation(orientation: number): void {
    if (orientation) {
      switch(orientation) {
        case 3:
          this.transform = 'rotate(180deg)';
          break;
  
        case 6:
          this.transform = 'rotate(90deg)';
          break;
  
        case 8:
          this.transform = 'rotate(270deg)';
          break;
  
        default:
          break;
      }  
    }
  }
}
