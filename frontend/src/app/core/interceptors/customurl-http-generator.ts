import { Injectable } from '@angular/core';
import { DefaultHttpUrlGenerator, HttpResourceUrls, Pluralizer } from '@ngrx/data';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomurlHttpGenerator extends DefaultHttpUrlGenerator {

  baseAPI = environment.apiUrl;

  constructor(
    pluralizer: Pluralizer,

  ) {
    super(pluralizer);
  }

  protected override getResourceUrls(
    entityName: string,
    root: string,
    trailingSlashEndpoints?: boolean
  ): HttpResourceUrls {
    let resourceURLs = this.knownHttpResourceUrls[entityName];
    //! Attention, il faut bien penser à ajouter les / dans certains cas selon l'API et sa convention
    switch (entityName) {
      case 'tickets':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/tickets/',
          entityResourceUrl: this.baseAPI + '/tickets/',
        };
        break;
      case 'users':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/users/',
          entityResourceUrl: this.baseAPI + '/users/',
        };
        break;
      case 'address':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/address/',
          entityResourceUrl: this.baseAPI + '/address/',
        };
        break;
      case 'categories':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/categories/',
          entityResourceUrl: this.baseAPI + '/categories/',
        };
        break;
      case 'priorities':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/priorities/',
          entityResourceUrl: this.baseAPI + '/priorities/',
        };
        break;
      case 'status':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/status/',
          entityResourceUrl: this.baseAPI + '/status/',
        };
        break;
      case 'media':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/media/',
          entityResourceUrl: this.baseAPI + '/media/',
        };
        break;
      case 'chat':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/chat/',
          entityResourceUrl: this.baseAPI + '/chat/',
        };
        break;
      case 'global_historical':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/historical/',
          entityResourceUrl: this.baseAPI + '/historical/',
        };
        break;
      case 'ticket_historical':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/historical-ticket/',
          entityResourceUrl: this.baseAPI + '/historical-ticket/',
        };
        break;
      case 'user_historical':
        resourceURLs = {
          collectionResourceUrl: this.baseAPI + '/historical-user/',
          entityResourceUrl: this.baseAPI + '/historical-user/',
        };
        break;
      default:
        break;
    }

    this.registerHttpResourceUrls({ [entityName]: resourceURLs });
    return resourceURLs;
  }

}
