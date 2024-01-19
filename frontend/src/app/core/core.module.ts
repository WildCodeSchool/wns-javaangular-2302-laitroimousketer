import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/layout/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchBarComponent } from './components/layout/search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AvatarComponent } from './components/common/avatar/avatar.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TicketDetailsComponent } from './components/layout/sidebar/sidebar-components/ticket-details/ticket-details.component';
import { ActivityComponent } from './components/layout/sidebar/sidebar-components/activity/activity.component';
import { SidebarMenuComponent } from './components/layout/sidebar/sidebar-components/sidebar-menu/sidebar-menu.component';
import { TicketAddComponent } from './components/layout/sidebar/sidebar-components/ticket-add/ticket-add.component';
import { TicketChatComponent } from './components/layout/sidebar/sidebar-components/ticket-chat/ticket-chat.component';
import { UserDetailsComponent } from './components/layout/sidebar/sidebar-components/user-details/user-details.component';
import { TicketCardComponent } from './components/tickets/ticket-card/ticket-card.component';
import { UserProfilComponent } from './components/layout/sidebar/sidebar-components/user-profil/user-profil.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { ChatRowComponent } from './components/common/chat-row/chat-row.component';
import { ImagePopUpComponent } from './components/common/image-pop-up/image-pop-up.component';
import { UserCardComponent } from './components/users/user-card/user-card.component';
import { CountUpModule } from 'ngx-countup';

@NgModule({
  declarations: [
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
    UserProfilComponent,
    ChatRowComponent,
    ImagePopUpComponent,
    UserCardComponent,
 
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
    MatAutocompleteModule,
    MatSelectModule,
 


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
    UserProfilComponent,
    UserCardComponent,
 
  ],
  providers: [],
})
export class CoreModule { }
