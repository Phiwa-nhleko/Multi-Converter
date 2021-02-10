import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LengthConverter } from 'src/app/classes/converter/length_converter.class';
import { NumericalConversionResult } from 'src/app/classes/converter/interface/data_types.interface';
import { NumericalConverter } from 'src/app/classes/converter/numerical_converter.class';
import { LengthConversionService } from '../length_conversion.service';

@Component({
  selector: 'app-length',
  templateUrl: './length.component.html',
  styleUrls: ['./length.component.scss']
})
export class LengthComponent implements OnInit {
  lengthConverter:NumericalConverter | undefined;
  lengthNames:string[] = [];
  lengthLookUpChangedSubscription:Subscription

  fromInput:string | undefined;
  toInput:string | undefined;
  fromOption:string | undefined;
  toOption:string | undefined;

  constructor(private lengthConversionService:LengthConversionService) {
    this.lengthLookUpChangedSubscription = lengthConversionService
     .lengthLookUpChanged
     .subscribe((lengthConverter:NumericalConverter)=>{
      this.lengthConverter = lengthConverter;
      this.lengthNames = lengthConverter.getLookUpNames();
      this.setInitialSelectOptions();
     })
   }

  ngOnInit(): void {
    this.lengthConversionService.fetchLengthConverter();
  }

  private setInitialSelectOptions():void{
    
    if(this.lengthNames[0]){
      this.fromOption = this.lengthNames[0]
      this.toOption = this.lengthNames[0]
    }

    if(this.lengthNames[1]){
      this.toOption = this.lengthNames[1]
    }
  }

  public convertFromToLength():void{
    if(this.lengthNames.length < 1){
      console.log("No currencies found");
      return
    }
    
    if(!this.fromOption) return;
    if(!this.toOption) return;
    if(!this.fromInput) return;

    let fromValue = parseFloat(this.fromInput);

    let conversionResult:NumericalConversionResult | undefined = this.lengthConverter?.convert(fromValue, this.fromOption, this.toOption)

    this.toInput = conversionResult?.targateValue.toFixed(2).toString();
  }

  public reverseConversionFromToLength():void{
    if(this.lengthNames.length < 1){
      console.log("No currencies found");
      return
    }
    
    if(!this.fromOption) return;
    if(!this.toOption) return;
    if(!this.toInput) return;

    let toValue = parseFloat(this.toInput);

    let conversionResult:NumericalConversionResult | undefined = this.lengthConverter?.convert(toValue, this.toOption, this.fromOption)

    this.fromInput = conversionResult?.targateValue.toFixed(2).toString();
  }

    public getLengthSymbol(code:string, format: "UpperCase" | "LowerCase"):string{
      let unitSymbole:any = {
        METER:"m",
        YARD:"yd",
        INCH:"in"
      }

      if(format == "UpperCase") return (<string>unitSymbole[code]).toUpperCase()
      if(format == "LowerCase") return (<string>unitSymbole[code]).toLowerCase()

      return (<string>unitSymbole[code]).toLowerCase()
    }

  getToLengthSymbol():string{
    if(!this.toOption) return ""
    return this.getLengthSymbol(this.toOption, "LowerCase")
  }

  getFromLengthSymbol():string{
    if(!this.fromOption) return ""
    return this.getLengthSymbol(this.fromOption, "LowerCase")
  }

  ngOnDestroy():void{
    if(this.lengthLookUpChangedSubscription){
      this.lengthLookUpChangedSubscription.unsubscribe();
    }
  }

}
