import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/common/footer/footer.component';
import { AlertComponent } from './components/common/alerts/alert.component';
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
import { MapComponent } from './components/common/map/map.component';
import { TicketDetailsComponent } from './components/common/sidebar/sidebar-components/ticket-details/ticket-details.component';
import { ActivityComponent } from './components/common/sidebar/sidebar-components/activity/activity.component';
import { SidebarMenuComponent } from './components/common/sidebar/sidebar-components/sidebar-menu/sidebar-menu.component';
import { TicketAddComponent } from './components/common/sidebar/sidebar-components/ticket-add/ticket-add.component';
import { TicketChatComponent } from './components/common/sidebar/sidebar-components/ticket-chat/ticket-chat.component';
import { TicketEditComponent } from './components/common/sidebar/sidebar-components/ticket-edit/ticket-edit.component';


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
    MapComponent,
    
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
    MapComponent,
  ],
  providers: [],
})
export class CoreModule { }
