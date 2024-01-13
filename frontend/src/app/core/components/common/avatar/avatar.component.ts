import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { MediaService } from 'src/app/core/services/media.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() userName: string = '';
  @Input() isArchive: boolean = false;
  @Input() user?: User;
  initials: string = ''; // Pour stocker les initiales
  bgColor: string = ''; // Pour stocker la couleur de fond
  userMediaId: number = 0;
  mediaImageUrl$!: Observable<SafeUrl | null>;
  private baseUrl = environment.apiUrl

  constructor(
    private mediaService: MediaService,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) { }
  ngOnInit() {
    this.userMediaId = this.user?.media?.id || 0;
    // console.log('userMediaId:', this.userMediaId);
    this.mediaImageUrl$ = this.getMediaImageUrl();
    if (this.userMediaId === 0) {
      this.extractInitials();
      this.generateBackgroundColor();
    }
  }

  // Méthode pour extraire les initiales à partir du nom d'utilisateur
  extractInitials() {
    if (this.user && this.user.firstname && this.user.lastname) {
      const nameParts = this.user.firstname + ' ' + this.user.lastname;
      const initialsArray = nameParts.split(' ')
        .filter(part => part.trim() !== '')
        .map(part => part[0]);
      this.initials = initialsArray.join('');
    }
  }

  // Méthode pour générer une couleur de fond basée sur les initiales et l'ID de l'utilisateur
  generateBackgroundColor() {
    // Utilisez l'ID de l'utilisateur pour générer la couleur
    const userId = this.hashCode(this.user!.firstname + this.user!.lastname);
    const hue = (userId % 360 + 360) % 360; // Assurez-vous que la valeur est positive et dans la plage 0-359
    const saturation = 50; // Augmentez la saturation à 50%
    const lightness = 50; // Luminosité fixée à 50%
    this.bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  // Méthode pour calculer un hash de chaîne simple
  hashCode(str: string): number {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
    }
    return hash;
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
