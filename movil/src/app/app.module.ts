import { LOCALE_ID,NgModule } from '@angular/core';
import localCo from '@angular/common/locales/es-CO';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { HttpClientModule } from '@angular/common/http';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// import { OneSignal } from '@ionic-native/onesignal/ngx';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';



import { WebView } from '@ionic-native/ionic-webview/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HomePage } from './pages/00-Home/home/home.page';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { NgxChartsModule } from '@swimlane/ngx-charts'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localCo);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
          BrowserModule,
          BrowserAnimationsModule,
          IonicModule.forRoot(),
          AppRoutingModule,
          HttpClientModule,
          ComponentsModule,
          PdfViewerModule,
          NgxChartsModule,
       
        ],
  providers: [

    StatusBar,
    SplashScreen, 
    // OneSignal,
    File,
    FileOpener, 
    FileTransfer,
    DocumentViewer,
    WebView,
    Camera,
    HomePage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-Co' },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
