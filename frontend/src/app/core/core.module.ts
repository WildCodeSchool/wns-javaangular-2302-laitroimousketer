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
import { ActivityComponent } from './components/sidebar-components/activity/activity.component';
import { SidebarMenuComponent } from './components//layout/sidebar/sidebar-menu/sidebar-menu.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { ChatRowComponent } from './components/common/chat-row/chat-row.component';
import { ImagePopUpComponent } from './components/common/image-pop-up/image-pop-up.component';
import { TicketAddComponent } from './components/sidebar-components/tickets/ticket-add/ticket-add.component';
import { TicketCardComponent } from './components/sidebar-components/tickets/ticket-card/ticket-card.component';
import { TicketChatComponent } from './components/sidebar-components/tickets/ticket-chat/ticket-chat.component';
import { TicketDetailsComponent } from './components/sidebar-components/tickets/ticket-details/ticket-details.component';
import { TicketEditComponent } from './components/sidebar-components/tickets/ticket-edit/ticket-edit.component';
import { TicketHistoricalCardComponent } from './components/sidebar-components/tickets/ticket-historical-card/ticket-historical-card.component';
import { TicketHistoricalComponent } from './components/sidebar-components/tickets/ticket-historical/ticket-historical.component';
import { UserCardComponent } from './components/sidebar-components/users/user-card/user-card.component';
import { UserDetailsComponent } from './components/sidebar-components/users/user-details/user-details.component';
import { UserHistoricalComponent } from './components/sidebar-components/users/user-historical-component/user-historical.component';
import { UserProfilComponent } from './components/sidebar-components/users/user-profil/user-profil.component';


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
    TicketHistoricalComponent,
    TicketHistoricalCardComponent,
    UserHistoricalComponent,
    TicketEditComponent,

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
    TicketHistoricalComponent,
    TicketHistoricalCardComponent,
    UserHistoricalComponent,
    TicketEditComponent,

  ],
  providers: [],
})
export class CoreModule { }
