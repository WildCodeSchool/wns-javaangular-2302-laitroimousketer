import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/alerts/alert.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  declarations: [
    FooterComponent,
    AlertComponent,
    HeaderComponent,


  ],
  imports: [
    CommonModule,
    RouterModule,
    AlertModule.forRoot(),
    MatSidenavModule,
    FormsModule,

  ],
  exports: [
    AlertComponent,
    MatSidenavModule,
    FormsModule,
    HeaderComponent,
  ],
  providers: [ 
  ],
})
export class CoreModule { }
