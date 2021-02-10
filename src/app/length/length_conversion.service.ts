import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import {NumericalConverter} from "../classes/converter/numerical_converter.class";
import { LengthConverter } from '../classes/converter/length_converter.class';
import { UIService } from '../services/ui.service';
import { HttpLengthDataService } from '../services/length_http_data.service';

@Injectable()

  export class LengthConversionService{

    lengthLookUpChanged = new Subject<NumericalConverter>();

    private lengthConverter:NumericalConverter | undefined

    constructor(private lengthHttpService:HttpLengthDataService, private uiService:UIService){}

    fetchLengthConverter(){
        this.uiService.loadingStateChanged.next(true);
  
        this.lengthHttpService.getLengthRatios()
        .subscribe((result:any)=>{
  
          this.uiService.loadingStateChanged.next(false);
          console.log("Result: ",result)
          this.lengthConverter = new LengthConverter(result["ratio"], result["base"])
          
          this.lengthLookUpChanged.next(this.lengthConverter);
        }, (error)=>{
           this.uiService.loadingStateChanged.next(false);
              this.uiService.showSnackBar('Error: Could Not Get Conversion Ratios',3000);
              this.lengthLookUpChanged.next();
        })
      }
  }