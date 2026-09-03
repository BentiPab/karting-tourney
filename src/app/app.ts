import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { KartingService } from './services/karting';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App implements OnInit {
  kartingService = inject(KartingService);

  activeSeason = this.kartingService.activeSeason;
  seasons = this.kartingService.availableSeasons;

  ngOnInit() {
    this.kartingService.cargarDatos();
  }

  changeSeason(year: number) {
    this.kartingService.setSeason(year);
  }
}
