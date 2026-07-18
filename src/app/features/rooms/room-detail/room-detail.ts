import { Component, inject, input, computed } from '@angular/core';
import { HotelData } from '../../../core/services/hotel-data';
import { AmenityItem } from '../../../shared/amenity-item/amenity-item';
import { CurrencyPipe } from '@angular/common';
import { CloudinaryImagePipe } from '../../../shared/pipes/cloudinary-image-pipe';
@Component({
  selector: 'app-room-detail',
  imports: [AmenityItem, CurrencyPipe, CloudinaryImagePipe],
  templateUrl: './room-detail.html',
  styleUrl: './room-detail.scss'
})
export class RoomDetail {
  private hotelData = inject(HotelData);

  id = input.required<number>();

  // signal derivado: busca la habitación cuyo id coincida
  room = computed(() =>
    this.hotelData.rooms().find(r => r.id === Number(this.id()))
  );
}