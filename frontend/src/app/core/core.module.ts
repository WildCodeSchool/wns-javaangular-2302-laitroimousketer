import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/common/footer/footer.component';
import { AlertComponent } from './components/common/alerts/alert.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/common/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchBarComponent } from './components/common/search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { AvatarComponent } from './components/common/avatar/avatar.component';
import { TicketDetailsComponent } from './components/sidebar-components/ticket-details/ticket-details.component';


@NgModule({
  declarations: [
    FooterComponent,
    AlertComponent,
    HeaderComponent,
    SearchBarComponent,
    AvatarComponent,
    TicketDetailsComponent,

  ],
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    MatSidenavModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
 
    
    
  ],
  exports: [
    AlertComponent,
    MatSidenavModule,
    FormsModule,
    HeaderComponent,
    MatMenuModule,
    SearchBarComponent,
    AvatarComponent,
    TicketDetailsComponent,
  ],
  providers: [],
})
export class CoreModule {}
