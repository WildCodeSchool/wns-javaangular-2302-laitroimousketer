import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NavbarComponent } from './core/components/common/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error-interceptor';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './core/components/common/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { NgrxStoreModule } from './core/store/ngrx-store.module';
import { NgrxDataHttpGenerator } from './core/interceptors/ngrx-data-interceptor';
import { environment } from 'src/environments/environment';

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
    StoreModule.forRoot({}, {}),
    NgrxStoreModule,
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
  
    
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // {provide: HTTP_INTERCEPTORS, useClass: NgrxDataHttpGenerator, multi: true,},
    {provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
