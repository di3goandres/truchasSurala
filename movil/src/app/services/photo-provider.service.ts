import { Injectable } from '@angular/core';
import { Photo } from '../models/photos';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

import { WebView } from '@ionic-native/ionic-webview/ngx';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})


export class PhotoProvider {
  base64File: string;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA
  }

  public photos: Photo[] = [];

  constructor(public http: UserService,
    private camera: Camera,
    private file: File,
    private webview: WebView
  ) {
    this.base64File = ''
    console.log('Hello PhotoProvider Provider');
  }

  async takePicture() {

  await  this.camera.getPicture(this.options).then(async (tempImage) => {
      // Add new photo to gallery
      console.log('Nombre', tempImage)
      // Extract just the filename. Result example: cdv_photo_003.jpg
      const tempFilename = tempImage.substr(tempImage.lastIndexOf('/') + 1);

      // Now, the opposite. Extract the full path, minus filename. 
      // Result example: file:///var/mobile/Containers/Data/Application
      // /E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/tmp/
      const tempBaseFilesystemPath = tempImage.substr(0, tempImage.lastIndexOf('/') + 1);

      // Get the Data directory on the device. 
      // Result example: file:///var/mobile/Containers/Data/Application
      // /E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/Library/NoCloud/
      const newBaseFilesystemPath = this.file.dataDirectory;


      this.file.copyFile(tempBaseFilesystemPath, tempFilename,
        newBaseFilesystemPath, tempFilename);


      // Result example: file:///var/mobile/Containers/Data/Application
      // /E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/Library/NoCloud/cdv_photo_003.jpg
      const storedPhoto = newBaseFilesystemPath + tempFilename;
      console.log('storage', storedPhoto)

      const displayImage = this.webview.convertFileSrc(storedPhoto);
    await  this.file.readAsDataURL(tempBaseFilesystemPath, tempFilename).then(result => {
        console.log('r', result)
        this.photos.unshift({
          data: displayImage,
          base64: result
        });
        this.base64File = result;
      }, error => console.log('e',error));

     
      console.log(this.photos);

    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });



    //   this.camera.getPicture(options).then((imageData) => {
    //     // Add new photo to gallery
    //     console.log(imageData)
    //     this.photos.unshift({
    //       data: 'data:image/jpeg;base64,' + imageData
    //     });
    //     console.log(this.photos);
    //   }, (err) => {
    //     // Handle error
    //     console.log("Camera issue: " + err);
    //   });
  }

  postFile(){
    this.http.postFile(this.photos[0]).subscribe(
      result => {console.log(result)},
      error => {console.log(error)}

    )
  }
}
