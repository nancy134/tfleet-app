import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleMaps } from "@ionic-native/google-maps";
import { HTTP } from '@ionic-native/http/ngx';
import { LocationProvider } from '../providers/locations';
import { VehicleProvider } from '../providers/vehicles';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AuthProvider } from '../providers/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule
//    HttpModule
    ],
  providers: [
    LocationProvider,
    VehicleProvider,
    AuthProvider,
    StatusBar,
    SplashScreen,
    GoogleMaps,
    HTTP,
    AppVersion,
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
