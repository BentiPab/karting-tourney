import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KartingService } from '../../services/karting';

@Component({
  selector: 'app-races-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './races-list.html',
})
export class RacesListComponent {
  kartingService = inject(KartingService);
  races = this.kartingService.availableRaces;
  season = this.kartingService.activeSeason;

  loading = this.kartingService.loading;
  error = this.kartingService.error;
}
