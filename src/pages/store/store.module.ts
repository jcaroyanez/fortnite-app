import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorePage } from './store';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    StorePage
  ],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(StorePage),
  ],
})
export class StorePageModule {}
