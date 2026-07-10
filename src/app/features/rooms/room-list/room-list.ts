import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HotelData } from '../../../core/services/hotel-data';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-room-list',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './room-list.html',
  styleUrl: './room-list.scss'
})
export class RoomList {
  hotelData = inject(HotelData);
}