import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { User } from './core/models/user.model';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as userAction from 'src/app/store/actions/user.action';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { AuthService } from './core/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  title = 'Alayde';
  isOnAuthPage: boolean = false;
  currentUrl: string = '';
  userConnected?: User;

  constructor(private router: Router,
    private store: Store<Reducer.StateDataStore>,
    private authService: AuthService,
    public alertService: AlertService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentUrl = event.url;
        this.isOnAuthPage = this.currentUrl.includes('auth');
      }
    });
  }
  
  ngOnInit(): void {
      if (!this.userConnected )  {
        this.authService.getUserProfile().subscribe( (user: User) => {
          this.userConnected = user;
          this.store.dispatch(userAction.saveUserConnected({payload: this.userConnected}));
        });
    
      }
  }
}
