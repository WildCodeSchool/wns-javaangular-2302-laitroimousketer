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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AvatarComponent } from './components/common/avatar/avatar.component';
import { TicketDetailsComponent } from './components/sidebar-components/ticket-details/ticket-details.component';
import { SidebarMenuComponent } from './components/sidebar-components/sidebar-menu/sidebar-menu.component';
import { ActivityComponent } from './components/sidebar-components/activity/activity.component';
import { TicketAddComponent } from './components/sidebar-components/ticket-add/ticket-add.component';
import { TicketEditComponent } from './components/sidebar-components/ticket-edit/ticket-edit.component';
import { TicketChatComponent } from './components/sidebar-components/ticket-chat/ticket-chat.component';


@NgModule({
  declarations: [
    FooterComponent,
    AlertComponent,
    HeaderComponent,
    SearchBarComponent,
    AvatarComponent,
    TicketDetailsComponent,
    SidebarMenuComponent,
    ActivityComponent,
    TicketAddComponent,
    TicketEditComponent,
    TicketChatComponent,
    
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
    TicketAddComponent,
    TicketEditComponent,
    SidebarMenuComponent,
    ActivityComponent,
  ],
  providers: [],
})
export class CoreModule { }
