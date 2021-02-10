import { LookUpData, NumericalConversionResult } from "./interface/data_types.interface";
import { NumericalConverter } from "./numerical_converter.class";

export class CurrencyConverter extends NumericalConverter{
    
    private baseUnit:string

    constructor(lookUpData:LookUpData, baseUnit:string){
        lookUpData[baseUnit] = 1;
        super(lookUpData);
        this.baseUnit = baseUnit.trim().toUpperCase();
    }

    public convert(currentValue: number, currentUnit: string, targetUnit: string): NumericalConversionResult {
        
        currentUnit = currentUnit.trim().toUpperCase();
        targetUnit = targetUnit.trim().toUpperCase();

        if(currentUnit === targetUnit)
        return {
            originalValue: currentValue,
            originalUnit:currentUnit,
            targateValue:currentValue,
            targateUnit:currentUnit
        };

        if(this.baseUnit === currentUnit){
            return this.convertToTargetUnit(currentValue, currentUnit, targetUnit);
        }

        let convertedToBaseResult =  this.convertToBaseUnit(currentValue, currentUnit);

        if(this.baseUnit === targetUnit) return convertedToBaseResult;

        let convertedToTargateResult = this.convertToTargetUnit(convertedToBaseResult.targateValue, currentUnit, targetUnit)
        
        //Override the original value with the current value/ input value
        convertedToTargateResult.originalValue = currentValue
        return convertedToTargateResult;
    }

    private convertToTargetUnit(currentValue:number, currentUnit:string, targetUnit:string):NumericalConversionResult{
        let targetRatio = <number> this.lookUpMap.get(targetUnit);
        let targateValue =  currentValue * targetRatio;

        return {
            originalValue: currentValue,
            originalUnit:currentUnit,
            targateValue:targateValue,
            targateUnit:targetUnit
        }
    }

    private convertToBaseUnit(currentValue:number, currentUnit:string):NumericalConversionResult{
        let targetRatio = <number> this.lookUpMap.get(currentUnit);
        let targateValue = currentValue / targetRatio;

        return {
            originalValue: currentValue,
            originalUnit:currentUnit,
            targateValue:targateValue,
            targateUnit:this.baseUnit
        }
    }

}