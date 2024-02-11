import { Component, Input, OnInit } from '@angular/core';
import { GlobalHistorical } from 'src/app/core/models/global-historical.model';
import { TicketHistorical } from 'src/app/core/models/ticket-historical.model';
import { UserHistorical } from 'src/app/core/models/user-historical.model';

@Component({
  selector: 'app-ticket-historical-card',
  templateUrl: './ticket-historical-card.component.html',
  styleUrls: ['./ticket-historical-card.component.scss']
})
export class TicketHistoricalCardComponent implements OnInit {
  @Input() data!: any;
  initials: string = '';
  bgColor: string = '';
  constructor() { }

  ngOnInit() {
    this.getInitials();
    // console.log(this.data);
    // console.log('initials',this.initials);
  }

  getInitials() {
    if (this.data.userName) {
      this.initials = this.getInitialsFromName(this.data.userName);
      this.generateBackgroundColor();
    } else if (this.data.authorName) {
      this.initials = this.getInitialsFromName(this.data.authorName);
      this.generateBackgroundColor();
    } else {
      this.initials = '';
    }
  }
  
  getInitialsFromName(name: string) {
    return name
      .split(' ')
      .map(word => word[0])
      .join('');
  }
    // Méthode pour générer une couleur de fond basée sur les initiales et l'ID de l'utilisateur
    generateBackgroundColor() {
      if (!!this.data.userName || !!this.data.authorName) {
      // Utilisez l'ID de l'utilisateur pour générer la couleur
      const userId = this.hashCode(this.data.userName || this.data.authorName);
      const hue = (userId % 360 + 360) % 360; // Assurez-vous que la valeur est positive et dans la plage 0-359
      const saturation = 50; // Augmentez la saturation à 50%
      const lightness = 50; // Luminosité fixée à 50%
      this.bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
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
