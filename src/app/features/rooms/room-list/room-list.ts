import { Component, inject, effect } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HotelData } from '../../../core/services/hotel-data';
import { CurrencyPipe } from '@angular/common';
import { CloudinaryImagePipe } from '../../../shared/pipes/cloudinary-image-pipe';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/core';
import { environment } from '../../../../environments/environment';

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

  private document = inject(DOCUMENT);

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

  private setCanonical(path: string): void {
  let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.document.head.appendChild(link);
  }
  link.setAttribute('href', `${environment.siteUrl}${path}`);
}
}