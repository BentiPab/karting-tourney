import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KartingService } from '../../services/karting';

@Component({
  selector: 'app-races-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './races-list.html',
})
export class RacesListComponent {
  kartingService = inject(KartingService);
  races = this.kartingService.availableRaces;
  season = this.kartingService.activeSeason;

  loading = this.kartingService.loading;
  error = this.kartingService.error;

  isFuture(dateString: string | Date): boolean {
    if (!dateString) return false;
    return new Date(dateString).getTime() > Date.now();
  }
}
