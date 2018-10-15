import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../envairoment/envairoment';
/*
  Generated class for the ChallengerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChallengerProvider {

  constructor(public http: HttpClient) {
    
  }

  getAll(){
    return this.http.get(`${URL}/challenger`);
  }

}
