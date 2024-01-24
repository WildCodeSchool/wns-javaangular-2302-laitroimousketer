import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AlertService } from './core/services/alert.service';
import { User } from './core/models/user.model';
import { Store } from '@ngrx/store';
import * as Reducer from './store/reducers/index';
import * as userAction from './store/actions/user.action';
import { UnsubcribeComponent } from './core/classes/unsubscribe.component';
import { AuthService } from './core/services/auth.service';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends UnsubcribeComponent implements OnInit {
  title = 'Alayde';
  isOnAuthPage: boolean = false;
  currentUrl: string = '';
  userConnected?: User;

  constructor(private router: Router,
    private store: Store<Reducer.StateDataStore>,
    private authService: AuthService,
    public alertService: AlertService) {
      super();
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {

        this.currentUrl = event.url;
        this.isOnAuthPage = this.currentUrl.includes('auth');
      }
    });
  }
  
  ngOnInit(): void {
      if (!this.userConnected )  {
        this.authService.getUserProfile().pipe(
          takeUntil(this.destroy$)
        ).subscribe( (user: User) => {
          this.userConnected = user;
          this.store.dispatch(userAction.saveUserConnected({payload: this.userConnected}));
        });
    
      }
  }
}
