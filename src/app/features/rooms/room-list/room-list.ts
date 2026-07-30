import { Component, inject, effect } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HotelData } from '../../../core/services/hotel-data';
import { CurrencyPipe } from '@angular/common';
import { CloudinaryImagePipe } from '../../../shared/pipes/cloudinary-image-pipe';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-room-list',
  imports: [RouterLink, RouterOutlet, CurrencyPipe, CloudinaryImagePipe],
  templateUrl: './room-list.html',
  styleUrl: './room-list.scss'
})
export class RoomList {
  hotelData = inject(HotelData);

  private titleService = inject(Title);
  private metaService = inject(Meta);

  constructor() {
    effect(() => {
      const info = this.hotelData.info();
      if (!info) return;

      this.titleService.setTitle(`Habitaciones — ${info.name}`);
      this.metaService.updateTag({
        name: 'description',
        content: `Conoce las habitaciones de ${info.name}: comodidad, precios y disponibilidad. Contáctanos directo por WhatsApp para reservar.`
      });
    });
  }
}