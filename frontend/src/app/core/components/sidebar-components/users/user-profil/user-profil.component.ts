import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/core/models/address.model';
import { User } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as userAction from 'src/app/store/actions/user.action';
import * as ticketAction from 'src/app/store/actions/ticket.action';
import * as sidebarAction from 'src/app/store/actions/sidebar.action';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { Observable, map, of, startWith, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { MenuItems } from '../../../layout/sidebar/sidebar-menu/menu-items.model';
import countries from 'src/assets/json/countries.json';
import cities from 'cities.json';
import { MediaService } from 'src/app/core/services/media.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent extends UnsubcribeComponent implements OnInit {
  user!: User
  userId!: number;
  address?: Address

  userForm!: FormGroup;
  addressForm!: FormGroup;
  uploadForm!: FormGroup;

  menuTitle: string = 'Profil';
  menuIcon: string = 'bi bi-person-fill';
  userMediaId: number = 0;
  mediaImageUrl$!: Observable<SafeUrl | null>;
  srcResult: any;

  fileSelected: boolean = false;
  countryList: { name: string, code?: string }[] = countries.map(country => ({ name: country.name }));
  citiesList = cities as { name: string, lat: string, lng: string, country: string, admin1: string, admin2?: string | undefined }[];
  filteredCountry!: Observable<{ name: string; code: string }[] | string[]>;
  filteredCities!: Observable<string[] | [string, { name: string; code: string; }]>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<Reducer.StateDataStore>,
    private userService: UserService,
    private mediaService: MediaService,
    private authService: AuthService,
    private alertService: AlertService,

  ) {
    super();


  }

  ngOnInit() {
    this.loadUserConnected();
    this.initUserForm();
    this.initAddressForm();
    this.initUploadForm();
  }



  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file')?.setValue(file);
      this.fileSelected = true;
      // Afficher l'aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  loadUserConnected() {
    this.store.select(Reducer.getUserConnected)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: User) => {
        this.userId = data.id;
        this.userService.getByKey(this.userId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((userData: User) => {
            console.log('user from by key', userData);
            this.user = userData;
            this.address = userData.address;
            this.userMediaId = this.user.media?.id || 0;
            this.uploadForm.patchValue({ userId: this.user.id });
            // console.log('user:', this.user);
            if (this.userMediaId !== 0) {
              this.mediaImageUrl$ = this.getMediaImageUrl();
            }
            // Check if this.user is defined before using it
            if (this.user) {
              this.userForm.patchValue({
                ...this.user,
              });
            }

            if (this.address) {
              this.addressForm.patchValue({
                ...this.address,
              });
            }
            // console.log(this.address);
          });
      });
  }


  initUserForm() {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.email],
      password: [
        '',
        [
          Validators.minLength(6),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'
          ),
        ],
      ],
      phone: [''],
    });
  }


  initAddressForm() {

    this.addressForm = this.formBuilder.group({
      street_l1: ['', Validators.required],
      street_l2: [''],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });

    this.filteredCountry = this.addressForm.get('country')!.valueChanges.pipe(
      startWith(''),
      // tap(value => console.log(this.addressForm.value)),
      map(value => this._filterCountry(value || '')),
      takeUntil(this.destroy$)
    );
    this.filteredCities = this.addressForm.get('city')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value || '')),
      takeUntil(this.destroy$)
    );
    // Mettez à jour la latitude et la longitude lorsqu'une ville est sélectionnée
    this.addressForm.get('city')!.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(selectedCity => {
      const cityInfo = this.citiesList.find(city => city.name.toLowerCase() === selectedCity.toLowerCase());

      if (cityInfo) {
        this.addressForm.patchValue({
          latitude: cityInfo.lat,
          longitude: cityInfo.lng,
        });
      }
    });
  }

  onSave() {
    // Vérifie si le formulaire d'utilisateur est valide
    if (this.userForm.valid) {
      // Crée un objet user à partir des données du formulaire utilisateur
      const user = { ...this.user, ...this.userForm.value };

      // Si le formulaire d'adresse est présent et valide
      if (this.user.role.roleTitle === "Client" && this.addressForm.valid) {
        // Vérifie si 'this.address' est défini avant de l'utiliser
        if (this.address) {
          // Met à jour les informations d'adresse dans l'objet user
          user.address = { ...this.address, ...this.addressForm.value };
        } else {
          // Si 'this.address' n'est pas défini, initialisez-le avec les valeurs du formulaire
          user.address = { ...this.addressForm.value };
        }
      }

      // Envoye les données mises à jour à ton backend ou effectue d'autres actions nécessaires
      this.userService.update(user).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (response) => {
          this.alertService.showSuccessAlert('Profil mis à jour avec succès !');
          this.store.dispatch(userAction.saveUserConnected({ payload: user }));
          // Déconnecte l'utilisateur si l'email ou le mot de passe a été modifié
          if ((this.userForm.get('email')?.dirty && this.userForm.get('email')?.value !== '') || (this.userForm.get('password')?.dirty && this.userForm.get('password')?.value !== '')) {
            this.authService.logout();
          }
          this.store.dispatch(sidebarAction.resetSideBar());
          // Tu peux également effectuer d'autres actions après la mise à jour du profil
        },
        error: (error) => {
          this.alertService.showErrorAlert('Erreur lors de la mise à jour du profil !');
          console.error('Erreur lors de la mise à jour du profil:', error);
          // Gère l'erreur, par exemple, affiche un message d'erreur à l'utilisateur
        }
      });
    }
  }


  sendFile() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file')?.value);
    formData.append('userId', this.uploadForm.get('userId')?.value);

    this.mediaService.addMedia(formData).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        // console.log('File uploaded successfully:', response);
        this.alertService.showSuccessAlert('Image mise à jour avec succès !');
        this.userService.getByKey(this.userId).pipe(takeUntil(this.destroy$)).subscribe((userData: User) => {
          this.user = userData;
          this.store.dispatch(userAction.saveUserConnected({ payload: this.user }));
          this.userMediaId = this.user.media?.id || 0;
          this.mediaImageUrl$ = this.getMediaImageUrl();
          this.store.dispatch(ticketAction.getTickets());
        }
        );
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        this.alertService.showErrorAlert('Erreur lors de la mise à jour de l\'image !');
        // Handle error, e.g., show an error message to the user
      },
    });

    this.fileSelected = false;
  }


  initUploadForm() {
    this.uploadForm = this.formBuilder.group({
      file: [''],
      userId: [0],
    });
  }

  onCancel() {
    this.userForm.patchValue({
      ...this.user,
    });
    this.store.dispatch(sidebarAction.resetSideBar());
  }

  private _filterCountry(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countryList
      .filter(option => option.name.toLowerCase().includes(filterValue))
      .map(option => option.name);
  }

  private _filterCities(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredCities = this.citiesList
      .filter(city => city.name.toLowerCase().includes(filterValue))
      .map(city => city.name)
      .sort((a, b) => {
        // Trier les villes en fonction de leur similarité avec la valeur entrée
        const indexOfA = a.toLowerCase().indexOf(filterValue);
        const indexOfB = b.toLowerCase().indexOf(filterValue);

        // Les villes qui commencent par la valeur entrée doivent apparaître en premier
        if (indexOfA === 0 && indexOfB !== 0) {
          return -1;
        } else if (indexOfB === 0 && indexOfA !== 0) {
          return 1;
        } else {
          // Sinon, utilisez l'ordre alphabétique
          return a.localeCompare(b);
        }
      });

    return filteredCities.slice(0, 10);
  }

  getMediaImageUrl(): Observable<SafeUrl | null> {
    // Vérifiez si user et user.media existent
    if (this.user && this.user.media) {
      return this.mediaService.getMediaById(this.user.media.id).pipe(
        // tap(url => console.log('Media Image URL:', url || 'Image URL is null or undefined'))
      );
    } else {
      // console.log('User or user media is null');
      return of(null); // Si user ou user.media est null, retournez un Observable null
    }
  }

}
