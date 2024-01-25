import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { EntityDataModule, EntityDataService } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

let entityMetaData = {
  users: {} // Utilisez le même nom que dans dans le constructor du service
};

const httpClientMock = {
  get: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        EntityDataService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot({
          entityMetadata: entityMetaData,
        }),
      ],
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    const mockUsers: User[] = [{ id: 1, name: 'User 1' }] as any;

    // Utilisez le service mock pour espionner la méthode 'get'
    httpClientMock.get.mockReturnValue(of(mockUsers));

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    // Vérifiez que la méthode 'get' du service mock a été appelée avec le bon URL
    const expectedUrl = `${environment.apiUrl}/users/`;
    expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);

    // Vérifiez que la méthode 'get' du service mock a été appelée une fois après la simulation de la réponse
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
  });


  it('should get a specific user', () => {
    const userId = 1;
    const mockUser: User = { id: userId, name: 'User 1' } as any;

    // Utilisez le service mock pour espionner la méthode 'get'
    httpClientMock.get.mockReturnValue(of(mockUser));

    service.getUser(userId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    // Vérifiez que la méthode 'get' du service mock a été appelée avec le bon URL
    const expectedUrl = `${environment.apiUrl}/users/${userId}`;
    expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);

    // Vérifiez que la méthode 'get' du service mock a été appelée une fois après la simulation de la réponse
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
  });

  it('should get users by roleId', () => {
    const roleId = 1;
    const mockUsers: User[] = [
      { id: 1, name: 'User 1', roleId: 1 },
      { id: 2, name: 'User 2', roleId: 2 }
    ] as any;

    // Utilisez le service mock pour espionner la méthode 'get'
    httpClientMock.get.mockReturnValue(of(mockUsers));

    service.getUsersByRoleId(roleId).subscribe((users) => {
      // Filtrez les utilisateurs avec le rôle "Manager" côté serveur
      const filteredUsers = mockUsers.filter(user => user.role.id === roleId);
      expect(users).toEqual(filteredUsers);
    });

    // Vérifiez que la méthode 'get' du service mock a été appelée avec le bon URL
    const expectedUrl = `${environment.apiUrl}/users/?role_id=${roleId}`;
    expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);

    // Vérifiez que la méthode 'get' du service mock a été appelée une fois après la simulation de la réponse
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
  });

  it('should get users by role title', () => {
    const roleTitle = 'Manager';
    const mockUsers: User[] = [
      { id: 1, name: 'User 1', roleTitle: 'Manager' },
      { id: 2, name: 'User 2', roleTitle: 'Client' }
    ] as any;

    // Utilisez le service mock pour espionner la méthode 'get'
    httpClientMock.get.mockReturnValue(of(mockUsers));

    service.getUsersByRoleTitle(roleTitle).subscribe((users) => {
      // Filtrez les utilisateurs avec le rôle "Manager" côté serveur
      const filteredUsers = mockUsers.filter(user => user.roleTitle === roleTitle);
      expect(users).toEqual(filteredUsers);
    });

    // Vérifiez que la méthode 'get' du service mock a été appelée avec le bon URL
    const expectedUrl = `${environment.apiUrl}/users/?role=${roleTitle}`;
    expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);

    // Vérifiez que la méthode 'get' du service mock a été appelée une fois après la simulation de la réponse
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
  });





  it('should get users by name or email', () => {
    const searchTerm = 'john';
    const mockUsers: User[] = [
      { id: 1, firstname: 'Laura Smith', email: 'john.doe@example.com' } as any,
      { id: 2, firstname: 'John Doe', email: 'lolo@lala.com' } as any,
      { id: 3, firstname: 'cou cou', email: 'lala@lala.com' } as any,
    ];

    // Utilisez le service mock pour espionner la méthode 'get'
    httpClientMock.get.mockReturnValue(of([mockUsers[0], mockUsers[1]]));

    service.getUsersByNameOrEmail(searchTerm).subscribe((users) => {
      expect(users).toEqual([mockUsers[0], mockUsers[1]]);
    });

    // Vérifiez que la méthode 'get' du service mock a été appelée avec le bon URL et les paramètres
    const expectedUrl = `${environment.apiUrl}/users/?search=${searchTerm}`;
    expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);

    // Vérifiez que la méthode 'get' du service mock a été appelée une deuxième fois après la simulation de la réponse
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
  });




});
