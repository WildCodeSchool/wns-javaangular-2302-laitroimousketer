import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as indexReducer from './reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { TicketEffects } from './effects/ticket.effect';
import { UserEffects } from './effects/user.effect';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('DataStoreKey', indexReducer.reducers),
    EffectsModule.forFeature(
      [
        TicketEffects,
        UserEffects,
      
      ]),
  ]
})
export class NgrxStoreModule { }
