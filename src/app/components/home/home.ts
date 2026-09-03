import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KartingService } from '../../services/karting';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  kartingService = inject(KartingService);

  activeSeason = this.kartingService.activeSeason;
  seasons = this.kartingService.availableSeasons;
  leaderboard = this.kartingService.leaderboard;
  races = this.kartingService.availableRaces;
  loading = this.kartingService.loading;
  error = this.kartingService.error;

  ngOnInit() {
    if (this.kartingService.results.length === 0) {
      this.kartingService.cargarDatos();
    }
  }

  changeSeason(year: number) {
    this.kartingService.setSeason(year);
  }
}
