import { Injectable } from '@angular/core';
import { Photo } from '../models/photos';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry, IFile, IWriteOptions } from '@ionic-native/file/ngx';

import { WebView } from '@ionic-native/ionic-webview/ngx';
import { UserService } from './user.service';
import { Storage } from '@ionic/storage';



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

  optionsSelect: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  public photos: Photo[] = [];
  public photo: Photo;


  constructor(public http: UserService,
    private camera: Camera,
    private file: File,
    private webview: WebView,
    private storage: Storage
  ) {
    this.base64File = ''

  }



  async selectPicture() {

    await this.camera.getPicture(this.optionsSelect).then(async (tempImage) => {
      let fileName: IFile;
      this.file.resolveLocalFilesystemUrl(tempImage).then((entry: FileEntry) => {
        entry.file(file => {
          fileName = file;

        });
      });
      // Add new photo to gallery


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


      const displayImage = this.webview.convertFileSrc(storedPhoto);
      await this.file.readAsDataURL(tempBaseFilesystemPath, tempFilename).then(result => {

        this.photos.unshift({
          data: displayImage,
          base64: result,
          fileName: fileName,
          id: 0
        });
        this.base64File = result;
      }, error => { });


    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });

  }

  async takePicture() {

    await this.camera.getPicture(this.options).then(async (tempImage) => {
      let fileName: IFile;
      this.file.resolveLocalFilesystemUrl(tempImage).then((entry: FileEntry) => {
        entry.file(file => {
          fileName = file;

        });
      });
      // Add new photo to gallery


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


      const displayImage = this.webview.convertFileSrc(storedPhoto);
      await this.file.readAsDataURL(tempBaseFilesystemPath, tempFilename).then(result => {

        this.photos.unshift({
          data: displayImage,
          base64: result,
          fileName: fileName,
          id: 0
        });
        this.base64File = result;
      }, error => { });


    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });


  }

  postFile() {
    this.http.postFile(this.photos[0]);
  }

  postFileFinca(id: any) {


    this.storage.set('finca' + id, this.photos[0]);

    // return this.http.postFileFinca(this.photos[0], id);
  }

  
  loadSaved(id){
   this.storage.get('finca' + id).then((photos) => {
      this.photo =  photos || null;
    });

 
  }
}
