import { Component, inject, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { KartingService } from '../../services/karting';

@Component({
  selector: 'app-driver-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './driver-profile.html',
})
export class DriverProfileComponent {
  private route = inject(ActivatedRoute);
  private kartingService = inject(KartingService);
  loading = this.kartingService.loading;
  error = this.kartingService.error;

  profileData = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.kartingService.getDriverStats(id);
  });
}
