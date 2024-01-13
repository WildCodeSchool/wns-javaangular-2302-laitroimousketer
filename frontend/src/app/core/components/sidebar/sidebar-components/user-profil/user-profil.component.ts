import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/core/models/address.model';
import { User } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as userAction from 'src/app/store/actions/user.action';
import * as sidebarAction from 'src/app/store/actions/sidebar.action';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { Observable, map, startWith, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { MenuItems } from '../sidebar-menu/menu-items.model';
import countries from 'src/assets/json/countries.json';
import cities from 'cities.json';
import { MediaService } from 'src/app/core/services/media.service';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent extends UnsubcribeComponent implements OnInit {



  userForm!: FormGroup;
  addressForm!: FormGroup;
  user!: User
  userId!: number;
  address?: Address

  menuTitle: string = 'Profil';
  menuIcon: string = 'bi bi-person-fill';
  srcResult: any;
  uploadForm!: FormGroup;

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

  ) {
    super();
  this.uploadForm = this.formBuilder.group({
      file: [''],
      userId: [2],
    });
  
  }

  ngOnInit() {
    this.loadUserConnected();
    this.initUserForm();
    this.initAddressForm();
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file')?.value);
    formData.append('userId', this.uploadForm.get('userId')?.value);
  
    this.mediaService.addMedia(formData).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        this
      },
      (error) => {
        console.error('Error uploading file:', error);
        // Handle error, e.g., show an error message to the user
      }
      );
      this.fileSelected = false;
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
            console.log('user from by key',userData);
            this.user = userData;
            this.address = userData.address;
            // Vérifiez que this.user et this.address sont définis avant de les utiliser
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
            console.log(this.address);
          });
      });
  }

  initUserForm() {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['',],
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
    // Vérifiez si le formulaire d'utilisateur est valide
    if (this.userForm.valid) {
      // Créez un objet user à partir des données du formulaire utilisateur
      const user = { ...this.user, ...this.userForm.value };
  
      // Si le formulaire d'adresse est présent, vérifiez s'il est valide
      if (this.user.role.roleTitle === "Client") {
        if (this.addressForm.valid) {
          // Mettez à jour les informations d'adresse dans l'objet user
          user.address = { ...this.address, ...this.addressForm.value };
        } else {
          // Si le formulaire d'adresse n'est pas valide, affichez un message ou prenez d'autres mesures nécessaires
          console.error('Le formulaire d\'adresse n\'est pas valide');
          return;
        }
      }
  
      // Envoyez les données mises à jour à votre backend ou effectuez d'autres actions nécessaires
      this.userService.update(user).pipe(
        takeUntil(this.destroy$)  // Utilisation de l'opérateur takeUntil pour gérer la désinscription automatique
      ).subscribe({
        next: (response) => {
          console.log('Profil mis à jour avec succès:', response);
          this.authService.login(this.user.email, this.user.password)
          // Vous pouvez également effectuer d'autres actions après la mise à jour du profil
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du profil:', error);
          // Gérez l'erreur, par exemple, affichez un message d'erreur à l'utilisateur
        }
      });
    }
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
}
