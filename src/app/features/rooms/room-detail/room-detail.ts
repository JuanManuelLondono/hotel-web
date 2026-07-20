import { Component, inject, input, computed } from '@angular/core';
import { HotelData } from '../../../core/services/hotel-data';
import { AmenityItem } from '../../../shared/amenity-item/amenity-item';
import { CurrencyPipe } from '@angular/common';
import { CloudinaryImagePipe } from '../../../shared/pipes/cloudinary-image-pipe';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-room-detail',
  imports: [AmenityItem, CurrencyPipe, CloudinaryImagePipe],
  templateUrl: './room-detail.html',
  styleUrl: './room-detail.scss'
})
export class RoomDetail {
  private hotelData = inject(HotelData);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  id = input.required<number>();
  room = computed(() => {
    const numericId = Number(this.id());
    return this.hotelData.rooms().find(r => r.id === numericId);
  });

  close(): void {
    this.router.navigate([{ outlets: { modal: null } }], {
      relativeTo: this.route.parent
    });
  }
}