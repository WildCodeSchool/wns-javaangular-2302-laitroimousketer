import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, Subscription, combineLatest, debounceTime, distinctUntilChanged, filter, map, of, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AddressService } from 'src/app/core/services/address.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { IMPORT_STATE } from '@ngrx/store-devtools/src/actions';
import { Address } from 'src/app/core/models/address.model';
import countries from 'src/assets/json/countries.json';
import cities from 'cities.json';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends UnsubcribeComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  addressForm!: FormGroup;

  step: number = 1;
  addressCreated: boolean = false;
  addresses: Address[] = [];

  countryList: { name: string, code?: string }[] = countries.map(country => ({ name: country.name }));
  citiesList = cities as { name: string, lat: string, lng: string, country: string, admin1: string, admin2?: string | undefined }[];
  filteredCountry!: Observable<{ name: string; code: string }[] | string[]>;
  filteredCities!: Observable<string[] | [string, { name: string; code: string; }]>;

  isLinear = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private addressService: AddressService,
    private alertService: AlertService,
  ) {
    super();
  }

  ngOnInit(): void {
    // console.log(cities);
    // console.log(countries);
    this.initAddressForm();
    this.initRegisterForm();
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
  addAddress(): Observable<Address> {
    if (this.addressForm.valid) {
      const addressData = this.addressForm.value;

      return this.addressService.add(addressData).pipe(
        takeUntil(this.destroy$),
      );
    }

    return EMPTY; // Return an empty observable if the form is invalid
  }

  register(): void {
    this.addAddress().pipe(
      filter(address => !!address), // Filter out invalid addresses
      switchMap((createdAddress: Address) => {
        // console.log('Address created successfully:', createdAddress);

        const firstname = this.registerForm.get('firstname')?.value;
        const lastname = this.registerForm.get('lastname')?.value;
        const email = this.registerForm.get('email')?.value;
        const phone = this.registerForm.get('phone')?.value;
        const password = this.registerForm.get('password')?.value;
        const confirmPassword = this.registerForm.get('confirmPassword')?.value;

        if (password !== confirmPassword) {
          this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
          throw new Error('Password mismatch');
        }

        // Pass the created address ID to the user registration call
        return this.authService.register(firstname, lastname, email, phone, password, createdAddress);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.switchToLogin();
      },
      error: (error: any) => {
        console.error('Error during registration:', error);
        this.alertService.showErrorAlert('Error during registration!');
      }
    });
  }



  initRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[\p{L}\s'-]+$/u)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[\p{L}\s'-]+$/u)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.pattern(/^(?:(\+|00)33|0)[1-9](?:\d{8})$/)], // Accepte les formats +336 et 06
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'
          ),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  checkPasswordMatch() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      this.registerForm.get('confirmPassword')?.setErrors(null);
    }

    return null;
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

  switchToLogin(): void {
    this.authService.switchToLogin();
    this.step = 1;
  }

  nextStep() {
    if (this.registerForm.valid) {
      this.step = 2;
    }
  }

  previousStep() {
    this.step = 1;
  }


}


