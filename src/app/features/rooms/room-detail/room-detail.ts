import { Component, inject, input, signal, computed, effect } from '@angular/core';
import { HotelData } from '../../../core/services/hotel-data';
import { AmenityItem } from '../../../shared/amenity-item/amenity-item';
import { CurrencyPipe } from '@angular/common';
import { CloudinaryImagePipe } from '../../../shared/pipes/cloudinary-image-pipe';
import { ActivatedRoute, Router } from '@angular/router';

const CLOSE_ANIMATION_MS = 220;

@Component({
  selector: 'app-room-detail',
  imports: [AmenityItem, CurrencyPipe, CloudinaryImagePipe],
  templateUrl: './room-detail.html',
  styleUrl: './room-detail.scss'
})
export class RoomDetail {
  private hotelData = inject(HotelData);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id = input.required<number>();
  room = computed(() => {
    const numericId = Number(this.id());
    return this.hotelData.rooms().find(r => r.id === numericId);
  });

  closing = signal(false);
  scrolled = signal(false);
  galleryIndex = signal(0);

  currentGalleryImage = computed(() => {
    const r = this.room();
    if (!r || r.gallery.length === 0) return undefined;
    return r.gallery[this.galleryIndex() % r.gallery.length];
  });

  private closeTimeout?: ReturnType<typeof setTimeout>;

  constructor() {
    // si el usuario navega de una habitación a otra sin cerrar el modal,
    // reinicia la galería a la primera foto en vez de dejarla en el índice anterior
    effect(() => {
      this.id();
      this.galleryIndex.set(0);
    });
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.scrolled.set(target.scrollTop > 16);
  }

  nextImage(): void {
    const r = this.room();
    if (!r) return;
    this.galleryIndex.update(i => (i + 1) % r.gallery.length);
  }

  prevImage(): void {
    const r = this.room();
    if (!r) return;
    this.galleryIndex.update(i => (i - 1 + r.gallery.length) % r.gallery.length);
  }

  close(): void {
    if (this.closing()) return;
    this.closing.set(true);

    this.closeTimeout = setTimeout(() => {
      this.router.navigate([{ outlets: { modal: null } }], {
        relativeTo: this.route.parent
      });
    }, CLOSE_ANIMATION_MS);
  }

  ngOnDestroy(): void {
    clearTimeout(this.closeTimeout);
  }
}