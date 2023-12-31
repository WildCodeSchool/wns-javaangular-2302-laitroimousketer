import { Injectable } from '@angular/core';
import { DefaultHttpUrlGenerator, HttpResourceUrls, Pluralizer } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CustomurlHttpGenerator extends DefaultHttpUrlGenerator {

  baseAPI = environment.apiUrl;

  constructor(
    pluralizer: Pluralizer,
    private authService: AuthService,
  ) {
    super(pluralizer);
  }

  protected override getResourceUrls(
    entityName: string,
    root: string,
    trailingSlashEndpoints?: boolean
  ): HttpResourceUrls {
    let resourceURLs = this.knownHttpResourceUrls[entityName];
  //! Attention, il faut bien penser à ajouter les / dans le cas des entityRssourceUrl pour respecter l'API et sa convention de nommage
    switch (entityName) {
      case 'tickets':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/tickets',
          entityResourceUrl: this.baseAPI + '/tickets/',
        };
        break;
      case 'users':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/users',
          entityResourceUrl: this.baseAPI + '/users/',
        };
        break;
      case 'address':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/address',
          entityResourceUrl: this.baseAPI + '/address',
        };
        break;
    }
  
    this.registerHttpResourceUrls({ [entityName]: resourceURLs });
    return resourceURLs;
  }

}
