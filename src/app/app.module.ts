import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { StastPageModule } from '../pages/stast/stast.module';
import { StorePageModule } from '../pages/store/store.module';
import { ChallengesPageModule } from '../pages/challenges/challenges.module';
import { FaIconComponent } from '../components/fa-icon.component';
import { StoreProvider } from '../providers/store/store';
import { ChallengerProvider } from '../providers/challenger/challenger';
import { StatsProvider } from '../providers/stats/stats';
//import { AdMobPro } from '@ionic-native/admob-pro';


@NgModule({
  declarations: [
    MyApp,
    FaIconComponent
  ],
  imports: [
    BrowserModule,
    TabsPageModule,
    StastPageModule,
    StorePageModule,
    ChallengesPageModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FaIconComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StoreProvider,
    ChallengerProvider,
    StatsProvider,
    //AdMobPro
  ]
})
export class AppModule {}
