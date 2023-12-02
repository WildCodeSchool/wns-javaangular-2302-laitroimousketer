import { Injectable } from '@angular/core';
import { DefaultHttpUrlGenerator, HttpResourceUrls, Pluralizer } from '@ngrx/data';
import { environment } from 'src/environments/environment';

@Injectable()
export class NgrxDataHttpGenerator extends DefaultHttpUrlGenerator {

  baseAPI = environment.apiUrl;

  constructor(pluralizer: Pluralizer) {
    super(pluralizer);
  }

  protected override getResourceUrls(
    entityName: string,
    root: string,
    trailingSlashEndpoints?: boolean
  ): HttpResourceUrls {
    let resourceURLs = this.knownHttpResourceUrls[entityName];

    switch (entityName) {
      case 'tickets':
        resourceURLs = {
          collectionResourceUrl: `${this.baseAPI}/tickets/`,
          entityResourceUrl: `${this.baseAPI}/tickets/`,
        };
        break;
      // Add other cases for different entities if needed

      default:
        // Handle default behavior or other entities if needed
        break;
    }

    this.registerHttpResourceUrls({ [entityName]: resourceURLs });
    return resourceURLs;
  }
}
