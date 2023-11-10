import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RenamingService {
  renameCategory(category: string): string {
    switch (category) {
      case 'BILLING':
        return 'Facturation';
      case 'FEATURE':
        return 'Fonctionnalité';
      case 'TECHNICAL':
        return 'Technique';
      default:
        return category;
    }
  }

  renameStatus(status: string): string {
    switch (status) {
      case 'TO_DO':
        return 'À faire';
      case 'DOING':
        return 'En cours';
      case 'DONE':
        return 'Terminé';
      default:
        return status;
    }
  }

  renamePriority(priority: string): string {
    switch (priority) {
      case 'LOW':
        return 'Basse';
      case 'MEDIUM':
        return 'Moyenne';
      case 'HIGH':
        return 'Haute';
      default:
        return priority;
    }
  }
}
