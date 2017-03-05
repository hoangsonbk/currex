import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CurrencyExchProvider } from '../../providers/currency-exch-provider'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CurrencyExchProvider]
})
export class HomePage {
	LCurrency: string;
	LCurrencyValue: string;
	RCurrency: string;
	RCurrencyValue: string;
	currencySelectAlertOpen: boolean;
	LValue: string;
	RValue: string;
	result: any;


	constructor(public navCtrl: NavController, public alertController: AlertController, public exchProvder: CurrencyExchProvider) {
    	this.LCurrency = 'USD';
    	this.RCurrency = 'USD';
    	this.exchProvder.baseCur = 'USD';
    	this.exchProvder.targetCur = 'JPY';
    	this.loadCurExchProider();
	}

	loadCurExchProider(){
		this.exchProvder.load().then(data => {
			this.result = data;
		});
	}

	leftCurrencyButtonClicked(event){
		this.selectCurrency("LCurrency");
	}

	rightCurrencyButtonClicked(event){
		this.selectCurrency("RCurrency");
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
        		console.log('Selected Data:' + data);
        		console.log('Current data:' + this.LCurrency + "-" + this.RCurrency);
        		this.LCurrency = (source=="LCurrency"? data : this.LCurrency);
        		this.RCurrency = (source=="RCurrency"? data : this.RCurrency);
        		this.currencySelectAlertOpen = false;
        		console.log('Updated data:' + this.LCurrency + "-" + this.RCurrency);
        		console.log('Input Data:' + this.LValue + "-" + this.RValue);
        		console.log('Result:' + this.result);
        	}
        });
        alert.present().then(() => {
      		this.currencySelectAlertOpen = true;
    	});
	}

}
