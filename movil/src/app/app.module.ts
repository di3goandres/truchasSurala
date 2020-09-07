import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { HttpClientModule } from '@angular/common/http';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// import { OneSignal } from '@ionic-native/onesignal/ngx';

import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HomePage } from './pages/00-Home/home/home.page';

import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { NgxChartsModule } from '@swimlane/ngx-charts'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
          NgxChartsModule
        ],
  providers: [
    StatusBar,
    SplashScreen, 
    // OneSignal,
    File,
    WebView,
    Camera,
    HomePage,DocumentViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
