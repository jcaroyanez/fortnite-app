import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChallengesPage } from './challenges';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ChallengesPage,
  ],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(ChallengesPage)
  ]
})
export class ChallengesPageModule {}
