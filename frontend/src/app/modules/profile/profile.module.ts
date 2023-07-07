import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ProfileRoutingModule } from './profile-routing.module';


@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileEditComponent
  ],
  imports: [
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
