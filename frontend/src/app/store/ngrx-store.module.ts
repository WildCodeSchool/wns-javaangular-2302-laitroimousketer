import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as indexReducer from './reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { TicketEffects } from './effects/ticket.effect';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';



@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot(indexReducer.reducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Alayde',
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [], // Utilisez StoreModule.forRoot pour le Store principal
    EffectsModule.forRoot([TicketEffects]),
  ]
})
export class NgrxStoreModule { }
