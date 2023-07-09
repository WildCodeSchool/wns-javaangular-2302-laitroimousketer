import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/alerts/alert.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';
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
    MatMenuModule,
    MatDialogModule,


  ],
  exports: [
    AlertComponent,
    MatSidenavModule,
    FormsModule,
    HeaderComponent,
    MatMenuModule,
  ],
  providers: [ 
  ],
})
export class CoreModule { }
