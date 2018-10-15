import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StastPage } from './stast';
import { HttpClientModule } from '@angular/common/http';
import { MatchesPageModule } from '../matches/matches.module';

@NgModule({
  declarations: [
    StastPage
  ],
  imports: [
    MatchesPageModule,
    HttpClientModule,
    IonicPageModule.forChild(StastPage),
  ]
})
export class StastPageModule {}
