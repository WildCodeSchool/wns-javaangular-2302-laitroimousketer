import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    UsersListComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CoreModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class UsersModule { }
