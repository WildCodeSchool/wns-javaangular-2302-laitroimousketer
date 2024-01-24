import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router, NavigationStart } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockRouter: { events: any };
  let mockAuthService: { getUserProfile: jest.Mock };
  let mockStore: { dispatch: jest.Mock };

  beforeEach(
    waitForAsync(() => {
      mockRouter = { events: of(new NavigationStart(0, 'some-url')) };
      mockAuthService = { getUserProfile: jest.fn() };
      mockStore = { dispatch: jest.fn() };

      TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [RouterTestingModule, StoreModule.forRoot({})], // Assurez-vous d'ajuster cette configuration en fonction de votre store
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: AuthService, useValue: mockAuthService },
          { provide: Store, useValue: mockStore },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });


  it('should not call authService.getUserProfile when userConnected is set', () => {
    // Simuler un utilisateur déjà connecté
    const mockUser: Partial<User> = {
      id: 1,
      firstname: 'john',
      lastname: 'doe',
      email: 'john@example.com',
      phone: '0123456789',
      // ... autres propriétés
    };
  
    component.userConnected = mockUser as User;
  
    // Appeler ngOnInit
    component.ngOnInit();
  
    // S'assurer que mockAuthService.getUserProfile n'a pas été appelé
    expect(mockAuthService.getUserProfile).not.toHaveBeenCalled();
  });
  

});
