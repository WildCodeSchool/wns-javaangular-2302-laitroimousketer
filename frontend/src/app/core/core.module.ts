import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/common/footer/footer.component';
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
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TicketDetailsComponent } from './components/common/sidebar/sidebar-components/ticket-details/ticket-details.component';
import { ActivityComponent } from './components/common/sidebar/sidebar-components/activity/activity.component';
import { SidebarMenuComponent } from './components/common/sidebar/sidebar-components/sidebar-menu/sidebar-menu.component';
import { TicketAddComponent } from './components/common/sidebar/sidebar-components/ticket-add/ticket-add.component';
import { TicketChatComponent } from './components/common/sidebar/sidebar-components/ticket-chat/ticket-chat.component';
import { UserDetailsComponent } from './components/common/sidebar/sidebar-components/user-details/user-details.component';
import { TicketCardComponent } from './components/tickets/ticket-card/ticket-card.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SearchBarComponent,
    AvatarComponent,
    TicketDetailsComponent,
    SidebarMenuComponent,
    ActivityComponent,
    TicketAddComponent,
    TicketChatComponent,
    UserDetailsComponent,
    TicketCardComponent,
    
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    LeafletModule,


  ],
  exports: [
    MatSidenavModule,
    FormsModule,
    HeaderComponent,
    MatMenuModule,
    SearchBarComponent,
    AvatarComponent,
    TicketDetailsComponent,
    TicketAddComponent,
    SidebarMenuComponent,
    ActivityComponent,
    UserDetailsComponent,
    TicketCardComponent,
  ],
  providers: [],
})
export class CoreModule { }
