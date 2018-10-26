import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { URL } from '../../envairoment/envairoment';

/*
  Generated class for the TweetsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TweetsProvider {

  constructor(public http: HttpClient,private platform:Platform) {}

  getAlltweets(){
    return this.http.get(`${URL}/tweets`);
  }

  

}
