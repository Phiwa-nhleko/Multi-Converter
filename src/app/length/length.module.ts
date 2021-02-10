import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LengthRoutingModule } from './length-routing.module';
import { LengthComponent } from './length/length.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { LengthConversionService } from './length_conversion.service';


@NgModule({
  declarations: [LengthComponent],
  imports: [
    CommonModule,
    LengthRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers:[LengthConversionService]
})
export class LengthModule { }
