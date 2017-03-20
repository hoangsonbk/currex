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
	baseCurrency: string;
	baseCurrencyValue: string;
	targetCurrency: string;
	targetCurrencyValue: string;
	currencySelectAlertOpen: boolean;
	LValue: string;
	RValue: string;
	result: any;


	constructor(public navCtrl: NavController, public alertController: AlertController, public exchProvder: CurrencyExchProvider) {
    	this.baseCurrency = 'USD';
    	this.targetCurrency = 'USD';
    	this.exchProvder.baseCur = 'USD';
    	this.exchProvder.targetCur = 'JPY';
    	//this.loadCurExchProider();
	}

	loadCurExchProider(){
		this.exchProvder.load().then(data => {
			this.result = JSON.stringify(data);
			console.log('>>>Result:' + this.result);
		});
	}

	baseCurrencyButtonClicked(event){
		this.selectCurrency("baseCurrency");
	}

	targetCurrencyButtonClicked(event){
		this.selectCurrency("targetCurrency");
	}

	update(){
		this.exchProvder.baseCur = this.baseCurrency;
        this.exchProvder.targetCur = this.targetCurrency;
        console.log('>>>this.exchProvder.baseCur:' + this.exchProvder.baseCur);
		this.loadCurExchProider();
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
			value:'AUD',
			label:'AUD'
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
        		console.log('Result:' + JSON.stringify(this.result));
        	}
        });
        alert.present().then(() => {
      		this.currencySelectAlertOpen = true;
    	});
	}

}
