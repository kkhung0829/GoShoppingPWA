import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, Observable } from 'rxjs';
import { WebcamInitError, WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.component.html',
  styleUrls: ['./take-photo.component.scss'],
})
export class TakePhotoComponent implements OnInit {

  // toggle webcam on/off
  public showWebcam = true;
  
  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  public handleInitError(error: WebcamInitError): void {
    const LOG_PREFIX = '[TakePhotoComponent::handleInitError] ';

    console.error(LOG_PREFIX + `error: ${JSON.stringify(error)}`);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public cancel(): void {
    this.modalController.dismiss();
  }

  public save(): void {
    this.modalController.dismiss(this.webcamImage.imageAsDataUrl);
  }
}
