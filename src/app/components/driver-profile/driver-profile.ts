import { Component, inject, computed, signal, OnDestroy, DOCUMENT, effect } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { KartingService } from '../../services/karting';

@Component({
  selector: 'app-driver-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './driver-profile.html',
})
export class DriverProfileComponent implements OnDestroy {
  private document = inject(DOCUMENT);
  private route = inject(ActivatedRoute);
  private kartingService = inject(KartingService);
  loading = this.kartingService.loading;
  error = this.kartingService.error;
  isImageModalOpen = signal(false);
  constructor() {
    effect(() => {
      const isOpen = this.isImageModalOpen();
      this.document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }
  openImage(): void {
    this.isImageModalOpen.set(true);
  }

  closeImage(): void {
    this.isImageModalOpen.set(false);
  }
  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }
  profileData = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.kartingService.getDriverStats(id);
  });
}
