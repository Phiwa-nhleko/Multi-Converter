import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  
  export class HttpLengthDataService{
    
    private hostUrl = environment.httpRequestAddress.legnthLookUpUrl;
    
    constructor(private httpClient:HttpClient){}

    public getLengthRatios(){
        return this.httpClient.get(this.hostUrl);
    }
  }