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

  /*exampleStore(){
    const headers = new HttpHeaders({"TRN-Api-Key":"820339e9-02d6-4598-bc67-df0fc7ce84a2",
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT',
                                    'Accept':'application/json',
                                    'content-type':'application/json'});
    this.http.get("https://api.fortnitetracker.com/v1/store",{headers:headers}).subscribe((res) => {
      alert(JSON.stringify(res));
      console.log('res',res);
    },
    err => {
      alert(JSON.stringify(err));
    })
  }*/

  getAll(){
    return this.http.get(`${URL}/store`);
  }

}
