import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyComponent } from './currency/currency.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyConversionService } from './currency_conversion.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CurrencyComponent],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers:[CurrencyConversionService, CurrencyPipe]
})
export class CurrencyModule { }
