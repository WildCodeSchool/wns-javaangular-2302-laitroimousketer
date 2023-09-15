import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileEditComponent
  ],
  imports: [
    ProfileRoutingModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ProfileModule { }