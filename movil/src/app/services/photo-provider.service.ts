import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../models/photos';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';


@Injectable({
  providedIn: 'root'
})


export class PhotoProvider {
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA
  }

  public photos: Photo[] = [];

  constructor(public http: HttpClient,
    private camera: Camera
  ) {
    console.log('Hello PhotoProvider Provider');
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });
      console.log(this.photos);
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });
  }
}
