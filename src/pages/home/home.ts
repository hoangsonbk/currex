import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CurrencyExchProvider } from '../../providers/currency-exch-provider'
import { Storage } from '@ionic/storage'
import { currencies } from './currencyList'
import * as anime from 'animejs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CurrencyExchProvider]
})
export class HomePage {
	baseCurrency: string;
	baseCurrencyValue: any;
	targetCurrency: string;
	targetCurrencyValue: any;
	currencySelectAlertOpen: boolean;
	LValue: string;
	RValue: string;
	result: any;
	backgroundImgSrc: string;

	constructor(public navCtrl: NavController, 
		        public alertController: AlertController, 
		        public exchProvder: CurrencyExchProvider,
		        public storage: Storage) {
		this.storage.get('storedData').then((val) => {
			if(val == null){
				console.log('>>>Storage has no data!');
				this.baseCurrency = 'USD';
				this.targetCurrency = 'JPY';
				this.exchProvder.baseCur = 'USD';
    			this.exchProvder.targetCur = 'JPY';
    			this.backgroundImgSrc = 'img/JPY.jpg';
    			this.baseCurrencyValue = 1;
    			let obj = {
    				base: 'USD',
    				target: 'JPY',
    				basevalue: 1
    			};
    			this.storage.set('storedData',JSON.stringify(obj));
    			this.requestExchProvider();
    			return;
			}else{
				console.log('>>>Storage has data!');
				let obj = JSON.parse(val);
				this.baseCurrency = obj.base;
				this.targetCurrency = obj.target;
				this.exchProvder.baseCur = obj.base;
    			this.exchProvder.targetCur = obj.target;
    			this.backgroundImgSrc = 'img/'+ obj.target + '.jpg';
    			this.baseCurrencyValue = obj.basevalue;
    			this.requestExchProvider();
    			return;
			}
		});
	}

	baseCurrencyButtonClicked(event){
		this.selectCurrency("baseCurrency");
	}

	targetCurrencyButtonClicked(event){
		this.selectCurrency("targetCurrency");
	}

	refreshButtonClicked(event){
		var animate = anime({
			targets: '.refresh-btn',
			easing: 'linear',
			rotate: '-1turn',
			autoplay: 'false'
		})
		animate.restart();
		animate.reverse();
		this.requestExchProvider();
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
		alert.setTitle("Select currency");
		for (var key in currencies) {
			if (currencies.hasOwnProperty(key)) {
				let selectLabel = key + " - " + currencies[key].currencyName;
    			alert.addInput({
				type: 'radio',
				value: key,
				label: selectLabel,
				//checked: selected
				});
  			}
		}
		// alert.addInput({
		// 	type: 'radio',
		// 	value:'USD',
		// 	label:'USD',
		// 	checked:true
		// });
		alert.addButton({
      		text: 'OK',
      		handler: data => {
        		//console.log('Selected Data:' + data);
        		if(data == null){
        			return;
        		}
        		this.baseCurrency = (source=="baseCurrency"? data : this.baseCurrency);
        		this.targetCurrency = (source=="targetCurrency"? data : this.targetCurrency);		
        		if(source=="targetCurrency"){
        			this.backgroundImgSrc = 'img/' + data + '.jpg';
        		}
        		this.currencySelectAlertOpen = false;
        		this.requestExchProvider();
        		let obj = {
    				base: this.baseCurrency,
    				target: this.targetCurrency,
    				basevalue: this.baseCurrencyValue
    			};
    			this.storage.set('storedData',JSON.stringify(obj));
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
