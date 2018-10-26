import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TweetsPage } from './tweets';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    TweetsPage,
  ],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(TweetsPage),
  ],
})
export class TweetsPageModule {}
