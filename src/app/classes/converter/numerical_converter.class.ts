import { LookUpData, NumericalConversionResult } from "./interface/data_types.interface";

export abstract class NumericalConverter{
    
    protected lookUpMap:Map<string, number>;

    constructor(lookUpData:LookUpData){
        
        this.lookUpMap = new Map<string, number>();
        this.loadLookUpData(lookUpData);
    }

    public loadLookUpData(lookUpData:LookUpData):void{
        this.setLookUpMap(lookUpData);
    }

    protected setLookUpMap(lookUpData:LookUpData):void{
        
        let keys = Object.keys(lookUpData);
        
        keys.forEach((key)=>{
            
            let formatedKey = key.toUpperCase().trim()
            this.lookUpMap.set(formatedKey, lookUpData[key]);
        });
    }
    
    public getLookUpNames():string[]{
        let keys = [...this.lookUpMap.keys()];
        return keys;
    }

    public abstract convert(currentValue:number, currentUnit:string, targetUnit:string):NumericalConversionResult;
}