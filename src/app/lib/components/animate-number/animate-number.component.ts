import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';

const HALF_RAD = Math.PI/2;

@Component({
  selector: 'app-animate-number',
  templateUrl: './animate-number.component.html',
  styleUrls: ['./animate-number.component.scss'],
})
export class AnimateNumberComponent implements OnInit, OnChanges {
  @Input() target: number = 0;
  @Input() countBy: number;
  @Input() interval: number = 14;
  @Input() steps: number = 45;
  @Input() timing: string | Function = 'linear'; // 'linear' | 'easeOut' | 'easeIn' | (interval, progress) => number
  @Input() formatter: Function = (val) => val.toString(); // (number) => string

  public displayValue: string;
  
  static TimingFunctions = {
    linear: (interval, progress) => {
        return interval
    },

    easeOut: (interval, progress) => {
        return interval * Math.sin(HALF_RAD * progress) * 5
    },

    easeIn: (interval, progress) => {
        return interval * Math.sin((HALF_RAD - HALF_RAD * progress)) * 5
    },
  };

  private value: number = 0;
  private startFrom: number = 0;  // Start value of last animation.
  private endWith: number = 0;    // End value of last animation.
  private stepSize: number = 0;
  private timer: any = null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.target) {
      if (this.value !== this.target) {
        this.startFrom = this.value;
        this.endWith = this.target;
        this.stepSize = (this.endWith - this.startFrom) / this.steps;
        if (this.countBy) {
          this.stepSize = Math.sign(this.stepSize) * this.countBy;
        }

        this.stopAnimation();
        this.doAnimation();
      }
    }
  }

  ngOnInit() {
    this.displayValue = this.formatter(this.value);
  }

  private stopAnimation = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private getAnimationProgress = () => {
    return (this.value - this.startFrom) / (this.endWith - this.startFrom);
  };

  private getTimingFunction = (interval, progress) => {
    if (typeof this.timing === 'string') {
        let fn = AnimateNumberComponent.TimingFunctions[this.timing];
        return fn(interval, progress);
    } else if (typeof this.timing === 'function') {
        return this.timing(interval, progress);
    } else {
        return AnimateNumberComponent.TimingFunctions['linear'](interval, progress);
    }
  };

  private doAnimation = () => {
    let progress = this.getAnimationProgress();

    this.timer = setTimeout(() => {
      this.value += this.stepSize;

      if ((this.stepSize > 0 && this.value < this.endWith) ||
          (this.stepSize < 0 && this.value > this.endWith)) {
        this.doAnimation();
      } else {
        this.value = this.endWith;
      }

      this.displayValue = this.formatter(this.value);
    }, this.getTimingFunction(this.interval, progress));
  }

}
