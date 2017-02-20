import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CurrencyExchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CurrencyExchProvider {

  constructor(public http: Http) {
    console.log('Hello CurrencyExchProvider Provider');
  }

  load() {
    if (this.data1) {
      return Promise.resolve(this.data1);
    }
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get('https://randomuser.me/api/?results=10')
        .map(res => res.json())
        .subscribe(data => {
          this.data1 = data.results;
          resolve(this.data1);
        });
    });
  }  

}
