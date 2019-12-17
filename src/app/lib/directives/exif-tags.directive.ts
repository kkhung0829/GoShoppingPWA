import {
  Directive,
  HostBinding,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Platform } from '@ionic/angular';

@Directive({
  selector: '[appExifTags]'
})
export class ExifTagsDirective implements OnInit, OnChanges {
  @Input('appExifTags') tags: object;

  @HostBinding('style.transform') transform: string;

  private isIOS: boolean;

  constructor(
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.isIOS = this.platform.is('ios');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tags) {
      if (!this.isIOS) {  // IOS not need to handle orientation
        this.handleOrientation(this.tags ? this.tags['Orientation'] : null);
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
  
        case 1:
        default:
          this.transform = '';
          break;
      }  
    } else {
      this.transform = '';
    }
  }
}
