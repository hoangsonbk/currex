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
  data:any;
  baseCur: string;
  targetCur: string;
  constructor(public http: Http) {
    console.log('Hello CurrencyExchProvider Provider');

    
  }

  load() {
    //if (this.data) {
    //  return Promise.resolve(this.data);
    //}
    // Dont have the data yet
    return new Promise(resolve => {
      console.log('-->' + this.baseCur + this.targetCur);
      this.http.get('http://api.fixer.io/latest?base='+this.baseCur+'&symbols='+this.targetCur)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data
          //this.data = data.rates.JPY;
          resolve(this.data);
          console.log('-->'+JSON.stringify(data));
        });
    });

    
  }  

}
