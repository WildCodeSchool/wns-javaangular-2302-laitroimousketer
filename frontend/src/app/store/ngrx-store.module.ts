import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as indexReducer from './reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { TicketEffects } from './effects/ticket.effect';



@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('DataStoreKey', indexReducer.reducers),
    EffectsModule.forFeature(
      [
        TicketEffects,
      
      ]),
  ]
})
export class NgrxStoreModule { }
