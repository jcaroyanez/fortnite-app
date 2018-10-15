import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../envairoment/envairoment';
/*
  Generated class for the StatsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StatsProvider {

  constructor(public http: HttpClient) {
    
  }

  getLifeTime(platform,username){
    return this.http.get(`${URL}/stats/lifetime/${platform}/${username}`);
  }

  getMatches(id){
    return this.http.get(`${URL}/profile/account/${id}`);
  }

  
}
