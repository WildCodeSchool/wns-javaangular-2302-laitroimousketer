import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NavbarComponent } from './core/components/layout/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error-interceptor';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './core/components/layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DefaultDataServiceConfig, EntityDataModule, HttpUrlGenerator } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { NgrxStoreModule } from './store/ngrx-store.module';
import { CustomurlHttpGenerator } from './core/interceptors/customurl-http-generator';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl,
};
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    StoreModule.forRoot(
      {},
      {}
    ),
    NgrxStoreModule,
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({
      name: 'Alayde',
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],

  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }, // pointage bonne url pour le ngrx data
    { provide: HttpUrlGenerator, useClass: CustomurlHttpGenerator },
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
