import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	leftCurrency: string;
	leftCurrencyValue: string;
	rightCurrency: string;
	rightCurrencyValue: string;
	currencySelectAlertOpen: boolean;


	constructor(public navCtrl: NavController, public alertController: AlertController) {
    	this.leftCurrency = 'USD';
	}

	leftCurrencyButtonClicked(event, button){
		console.log(">>>Left cliked:" + button.id);
		this.selectCurrency(name);
	}

	rightCurrencyButtonClicked(event, item){

	}

	selectCurrency(sourceButton){
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
        		console.log('Radio data:', data);
        		this.leftCurrency = data;
        		this.currencySelectAlertOpen = false;
        	}
        });
        alert.present().then(() => {
      		this.currencySelectAlertOpen = true;
    	});
	}

}
