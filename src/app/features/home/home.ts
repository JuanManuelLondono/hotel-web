import { Component, inject } from '@angular/core';
import { HotelData } from '../../core/services/hotel-data';
import { AmenityItem } from '../../shared/amenity-item/amenity-item';
@Component({
  selector: 'app-home',
  imports: [AmenityItem],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  hotelData = inject(HotelData);
}
