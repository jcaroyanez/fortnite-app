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
import { AdMobFree } from '@ionic-native/admob-free';
import { DatabaseProvider } from '../providers/database/database';
import { CategoryPageModule } from '../pages/category/category.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SubCategoryPageModule } from '../pages/sub-category/sub-category.module';
import { TweetsPageModule } from '../pages/tweets/tweets.module';
import { TweetsProvider } from '../providers/tweets/tweets';

const config = {
  apiKey: "AIzaSyAibXoIlVVbTJuIiFqyiyYHswDdBPV73XA",
  authDomain: "fornie-es.firebaseapp.com",
  databaseURL: "https://fornie-es.firebaseio.com",
  projectId: "fornie-es",
  storageBucket: "fornie-es.appspot.com",
  messagingSenderId: "910000022844"
};

@NgModule({
  declarations: [
    MyApp,
    FaIconComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top', tabsHideOnSubPages: true,}),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    TabsPageModule,
    StastPageModule,
    StorePageModule,
    ChallengesPageModule,
    CategoryPageModule,
    SubCategoryPageModule,
    TweetsPageModule
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
    AdMobFree,
    DatabaseProvider,
    TweetsProvider
  ]
})
export class AppModule {}
