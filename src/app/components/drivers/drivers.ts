import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KartingService } from '../../services/karting';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './drivers.html',
})
export class DriversComponent implements OnInit {
  kartingService = inject(KartingService);

  pilots = this.kartingService.drivers;
  loading = this.kartingService.loading;
  error = this.kartingService.error;

  ngOnInit() {
    if (this.kartingService.drivers().length === 0) {
      this.kartingService.cargarDatos();
    }
  }
}
