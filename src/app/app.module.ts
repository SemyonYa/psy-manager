import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DesktopPageModule } from './desktop/desktop.module';
import { SpecialistPageModule } from './specialist/specialist.module';
import { CustomIonicRreuseStrategy } from './_services/custom-ionic-reuse-strategy';
import { UserPageModule } from './user/user.module';
import { ProfilePageModule } from './profile/profile.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DesktopPageModule,
    SpecialistPageModule,
    UserPageModule,
    ProfilePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: CustomIonicRreuseStrategy } // CustomReuseStrategy IonicRouteStrategy CacheRouteReuseStrategy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
