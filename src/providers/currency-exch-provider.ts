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
  refresh: any;
  constructor(public http: Http) {
    console.log('>>>CurrencyExchProvider executed');  
  }

  load() {
    //if (this.data) {
    //  return Promise.resolve(this.data);
    //}
    // Dont have the data yet
    return new Promise(resolve => {
      //console.log('-->' + this.baseCur + this.targetCur);
      //let queryString = 'http://api.fixer.io/latest?base='+this.baseCur+'&symbols='+this.targetCur
      let queryString = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22' + this.baseCur + this.targetCur + '%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
      this.http.get(queryString)
        .map(res => res.json())
        .subscribe(data => {
          //this.data = data
          //this.data = data.rates[this.targetCur];
          this.data = data.query.results.rate.Rate;
          resolve(this.data);
          //console.log('-->'+JSON.stringify(data));
        });
    });

    
  }  

}
