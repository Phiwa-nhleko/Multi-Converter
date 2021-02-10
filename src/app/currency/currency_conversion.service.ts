import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { HttpCurrencyDataService } from '../services/currency_http_data.service';
import {NumericalConverter} from "../classes/converter/numerical_converter.class";
import { CurrencyConverter } from '../classes/converter/currency_converter.class';
import { UIService } from '../services/ui.service';

@Injectable()

  export class CurrencyConversionService{
    
    currencyLookUpChanged = new Subject<NumericalConverter>();

    private currencyConverter:NumericalConverter | undefined

    constructor(private currencyHttpService:HttpCurrencyDataService, private uiService:UIService){
    }

    fetchCurrencyConverter(){
      this.uiService.loadingStateChanged.next(true);

      this.currencyHttpService.getCurrencyRates()
      .subscribe((result:any)=>{

        this.uiService.loadingStateChanged.next(false);

        this.currencyConverter = new CurrencyConverter(result["rates"], result["base"])
        this.currencyLookUpChanged.next(this.currencyConverter);
      }, (error)=>{
         this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar('Error: Could Not Get Conversion Rates',3000);
            this.currencyLookUpChanged.next();
      })
    }
  }