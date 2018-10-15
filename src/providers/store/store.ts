import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../envairoment/envairoment';
/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreProvider {

  constructor(public http: HttpClient) {
    console.log('Hello StoreProvider Provider');
  }

  getAll(){
    return this.http.get(`${URL}/store`);
  }

}
