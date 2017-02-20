import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	LCurrency: string;
	LCurrencyValue: string;
	RCurrency: string;
	RCurrencyValue: string;
	currencySelectAlertOpen: boolean;


	constructor(public navCtrl: NavController, public alertController: AlertController) {
    	this.LCurrency = 'USD';
    	this.RCurrency = 'USD';
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
        	}
        });
        alert.present().then(() => {
      		this.currencySelectAlertOpen = true;
    	});
	}

}
