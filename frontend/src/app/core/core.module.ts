import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalLogoutComponent } from './components/modals/modal-logout/modal-logout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    FooterComponent,
    ModalLogoutComponent,
    // HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [ 
  ],
})
export class CoreModule { }
