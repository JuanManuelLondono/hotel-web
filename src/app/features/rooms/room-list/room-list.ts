import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HotelData } from '../../../core/services/hotel-data';
import { CurrencyPipe } from '@angular/common';
import { CloudinaryImagePipe } from '../../../shared/pipes/cloudinary-image-pipe';

@Component({
  selector: 'app-room-list',
  imports: [RouterLink, RouterOutlet, CurrencyPipe, CloudinaryImagePipe],
  templateUrl: './room-list.html',
  styleUrl: './room-list.scss'
})
export class RoomList {
  hotelData = inject(HotelData);
}