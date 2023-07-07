import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/alerts/alert.component';
import { AlertModule } from 'ngx-bootstrap/alert';
@NgModule({
  declarations: [
    FooterComponent,
<<<<<<< HEAD
    AlertComponent,

    // HeaderComponent,
=======

>>>>>>> develop
  ],
  imports: [
    CommonModule,
    RouterModule,
    AlertModule.forRoot(),
  ],
  exports: [
    AlertComponent, 
  ],
  providers: [ 
  ],
})
export class CoreModule { }
