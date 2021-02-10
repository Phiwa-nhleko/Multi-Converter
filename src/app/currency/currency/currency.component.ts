import { CurrencyPipe, getCurrencySymbol } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyConverter } from 'src/app/classes/converter/currency_converter.class';
import { NumericalConversionResult } from 'src/app/classes/converter/interface/data_types.interface';
import { NumericalConverter } from 'src/app/classes/converter/numerical_converter.class';
import { CurrencyConversionService } from '../currency_conversion.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit, OnDestroy {

   currencyConverter:NumericalConverter | undefined;
   currencyNames:string[] = [];
   currencyLookUpChangedSubscription:Subscription

   fromInput:string | undefined;
   toInput:string | undefined ;
   fromOption:string  |undefined;
   toOption:string | undefined;

  constructor(private currencyConversionService:CurrencyConversionService, private currencyPipe:CurrencyPipe) {
     this.currencyLookUpChangedSubscription = currencyConversionService
     .currencyLookUpChanged
     .subscribe((currencyConverter:NumericalConverter)=>{
      this.currencyConverter = currencyConverter;
      this.currencyNames = currencyConverter.getLookUpNames();
      this.setInitialSelectOptions();
     })
   }

  ngOnInit(): void {
    this.currencyConversionService.fetchCurrencyConverter();
  }

  private setInitialSelectOptions():void{
    
    if(this.currencyNames[0]){
      this.fromOption = this.currencyNames[0]
      this.toOption = this.currencyNames[0]
    }

    if(this.currencyNames[1]){
      this.toOption = this.currencyNames[1]
    }
  }

  public convertFromToCurrency():void{
    
    if(this.currencyNames.length < 1){
      console.log("No currencies found");
      return
    }
    
    if(!this.fromOption) return;
    if(!this.toOption) return;
    console.log("TEST ",this.fromInput)
    if(!this.fromInput) return;
    
    let fromValue = parseFloat(this.fromInput);

    let conversionResult:NumericalConversionResult | undefined = this.currencyConverter?.convert(fromValue, this.fromOption, this.toOption)
    
    this.toInput = conversionResult?.targateValue.toFixed(2).toString();

  }

  public reverseConversionFromToCurrency():void{
    if(this.currencyNames.length < 1){
      console.log("No currencies found");
      return
    }
    
    if(!this.fromOption) return;
    if(!this.toOption) return;
    if(!this.toInput) return;

    let toValue = parseFloat(this.toInput);

    let conversionResult:NumericalConversionResult | undefined = this.currencyConverter?.convert(toValue, this.toOption, this.fromOption)
    
    this.fromInput = conversionResult?.targateValue.toFixed(2).toString();
  }

  getToCurrencySymbol():string{
    if(!this.toOption) return ""
    return getCurrencySymbol(this.toOption, "wide")
  }

  getFromCurrencySymbol():string{
    if(!this.fromOption) return ""
    return getCurrencySymbol(this.fromOption, "wide")
  }

  ngOnDestroy():void{
    if(this.currencyLookUpChangedSubscription){
      this.currencyLookUpChangedSubscription.unsubscribe();
    }
  }

}
