import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn:'root'
})
export class UIService{
    loadingStateChanged = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar){
        
    }

    showSnackBar(message:string, duration:number , action?:string | undefined)
    {
        this.snackbar.open(message, action, {
            duration: duration
        });
    }
}