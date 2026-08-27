import { Component, inject, effect } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HotelData } from '../../../core/services/hotel-data';
import { DecimalPipe } from '@angular/common';
import { CloudinaryImagePipe } from '../../../shared/pipes/cloudinary-image-pipe';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-room-list',
  imports: [RouterLink, RouterOutlet, DecimalPipe, CloudinaryImagePipe],
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

      this.setOpenGraph(info, '/habitaciones');
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

  private setOpenGraph(info: NonNullable<ReturnType<typeof this.hotelData.info>>, path: string): void {
    const firstRoom = this.hotelData.rooms()[0];
    const imagePublicId = firstRoom?.coverImage ?? info.heroImage;
    const imageUrl = `https://res.cloudinary.com/${environment.cloudinaryCloudName}/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/${imagePublicId}`;
    const pageUrl = `${environment.siteUrl}${path}`;
    const title = `Habitaciones — ${info.name}`;
    const description = `Conoce las habitaciones de ${info.name} y sus precios.`;

    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaService.updateTag({ property: 'og:url', content: pageUrl });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: info.name });

    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });
  }
}