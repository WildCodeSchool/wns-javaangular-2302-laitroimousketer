import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})

  export class AddressService extends EntityCollectionServiceBase<Address> {
    private baseUrl = environment.apiUrl;
  
    constructor(
      private httpClient: HttpClient,
      serviceElementsFactory: EntityCollectionServiceElementsFactory,
    ) {
      super('address', serviceElementsFactory);
    }
}
