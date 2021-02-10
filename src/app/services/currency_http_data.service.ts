import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  
  export class HttpCurrencyDataService{
    
    private hostUrl = environment.httpRequestAddress.currencyLookUpUrl;
    
    constructor(private httpClient:HttpClient){}

    public getCurrencyRates(){
        return this.httpClient.get(this.hostUrl);
    }
  }