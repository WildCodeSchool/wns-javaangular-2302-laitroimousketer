import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { Media } from '../models/media.model';
import { Observable, map } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MediaService extends EntityCollectionServiceBase<Media> {

  private baseUrl = environment.apiUrl

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer) {
    super('media', serviceElementsFactory)}

    addMedia(fileData: FormData): Observable<Media> {
      return this.httpClient.post<Media>(`${this.baseUrl}/media/upload`, fileData);
    }

    getMediaById(id: number): Observable<SafeUrl> {
      return this.httpClient.get(`${this.baseUrl}/media/file/${id}`, {
        responseType: 'arraybuffer',
      }).pipe(
        map(data => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(new Blob([data]))))
      );
    }
    
    
    
}

