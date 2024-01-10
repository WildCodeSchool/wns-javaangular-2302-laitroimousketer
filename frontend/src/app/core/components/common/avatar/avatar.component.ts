import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { MediaService } from 'src/app/core/services/media.service';

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

  constructor(
    private mediaService: MediaService,
  ) { }

  ngOnInit() {
    this.extractInitials();
    this.generateBackgroundColor();
    // console.log(this.bgColor);
  }

  // Méthode pour extraire les initiales à partir du nom d'utilisateur
  extractInitials() {
    if (this.userName) {
    const nameParts = this.userName.split(' ');
    if (nameParts.length >= 2) {
      this.initials = nameParts[0][0] + nameParts[1][0];
    } else if (nameParts.length === 1) {
      this.initials = nameParts[0][0];
    }
  } else if (this.user) {
    const nameParts = this.user.firstname.split(' ');
    if (nameParts.length >= 2) {
      this.initials = nameParts[0][0] + nameParts[1][0];
    } else if (nameParts.length === 1) {
      this.initials = nameParts[0][0];
    }
  }
}

  // Méthode pour générer une couleur de fond basée sur les initiales et l'ID de l'utilisateur
  generateBackgroundColor() {
    // Utilisez l'ID de l'utilisateur pour générer la couleur
    const userId = this.hashCode(this.userName);
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
}
