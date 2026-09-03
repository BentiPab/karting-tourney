import { Component, inject, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { KartingService } from '../../services/karting';

@Component({
  selector: 'app-race-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './race-detail.html',
})
export class RaceDetailComponent {
  private route = inject(ActivatedRoute);
  private kartingService = inject(KartingService);
  loading = this.kartingService.loading;
  error = this.kartingService.error;
  race = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.kartingService.getRaceDetails(id);
  });
}
