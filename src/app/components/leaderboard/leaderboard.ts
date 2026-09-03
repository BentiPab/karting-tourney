import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { KartingService } from '../../services/karting';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './leaderboard.html',
})
export class LeaderboardComponent implements OnInit {
  kartingService = inject(KartingService);

  // Exponemos las signals del servicio directamente a la vista
  leaderboard = this.kartingService.leaderboard;
  cargando = this.kartingService.loading;
  error = this.kartingService.error;
  activeSeason = this.kartingService.activeSeason;

  ngOnInit() {
    // Equivalente al useEffect(() => {}, []) de React
    this.kartingService.cargarDatos();
  }
}
