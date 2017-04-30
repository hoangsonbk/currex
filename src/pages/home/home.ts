import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CurrencyExchProvider } from '../../providers/currency-exch-provider'

import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CurrencyExchProvider]
})
@Injectable()
export class HomePage {
	baseCurrency: string;
	baseCurrencyValue: any;
	targetCurrency: string;
	targetCurrencyValue: any;
	currencySelectAlertOpen: boolean;
	LValue: string;
	RValue: string;
	result: any;
	currencies: any;


	constructor(public navCtrl: NavController, public alertController: AlertController, public exchProvder: CurrencyExchProvider, http: Http) {
    	this.baseCurrency = 'USD';
    	this.targetCurrency = 'JPY';
    	this.exchProvder.baseCur = 'USD';
    	this.exchProvder.targetCur = 'JPY';
    	this.baseCurrencyValue = 1;
    	this.requestExchProvider();
    	this.currencies =  http.get('assets/json/currencies.json').map(res => res.json());
    	console.log('>>>currencies:' + JSON.stringify(this.currencies));
	}

	baseCurrencyButtonClicked(event){
		this.selectCurrency("baseCurrency");
	}

	targetCurrencyButtonClicked(event){
		this.selectCurrency("targetCurrency");
	}

	requestExchProvider(){
		this.exchProvder.baseCur = this.baseCurrency;
        this.exchProvder.targetCur = this.targetCurrency;
        //console.log('>>>this.exchProvder.baseCur:' + this.exchProvder.baseCur);
		this.exchProvder.load().then(data => {
			this.result = data;
			console.log('>>>@home-Request result:' + JSON.stringify(this.result));
			this.targetCurrencyValue = (this.baseCurrencyValue * this.result).toFixed(2);
		});
	}

	selectCurrency(source){
		let alert = this.alertController.create();
		alert.addInput({
			type: 'radio',
			value:'USD',
			label:'USD',
			checked:true
		});
		alert.addInput({
			type: 'radio',
			value:'JPY',
			label:'JPY'
		});
		alert.addInput({
			type: 'radio',
			value:'VND',
			label:'VND'
		});
		alert.addButton({
      		text: 'OK',
      		handler: data => {
        		//console.log('Selected Data:' + data);
        		this.baseCurrency = (source=="baseCurrency"? data : this.baseCurrency);
        		this.targetCurrency = (source=="targetCurrency"? data : this.targetCurrency);
        		this.currencySelectAlertOpen = false;
        		//console.log('Updated data:' + this.LCurrency + "-" + this.RCurrency);
        		//console.log('Input Data:' + this.LValue + "-" + this.RValue);
        		//console.log('Result:' + JSON.stringify(this.result));
        	}
        });
        alert.present().then(() => {
      		this.currencySelectAlertOpen = true;
    	});
	}

}
