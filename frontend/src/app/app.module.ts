import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error-interceptor';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
   
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
