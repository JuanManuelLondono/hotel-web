import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { HotelData } from '../../core/services/hotel-data';
import { AmenityItem } from '../../shared/amenity-item/amenity-item';
import { CloudinaryImagePipe } from '../../shared/pipes/cloudinary-image-pipe';
@Component({
  selector: 'app-home',
  imports: [AmenityItem, CloudinaryImagePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home  implements OnInit, OnDestroy{
  hotelData = inject(HotelData);

  private activeIndex = signal(0);
  private intervalId?: ReturnType<typeof setInterval>;

  // imagen actualmente visible, recalculada cuando cambia el índice o llegan los datos
  currentImage = computed(() => {
    const images = this.hotelData.info()?.heroImages ?? [];
    return images[this.activeIndex()];
  });

  totalImages = computed(() => this.hotelData.info()?.heroImages?.length ?? 0);
  activeIndexValue = computed(() => this.activeIndex());

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.next(), 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  next(): void {
    const total = this.totalImages();
    if (total === 0) return;
    this.activeIndex.update(i => (i + 1) % total);
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }
}
