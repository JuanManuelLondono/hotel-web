import { Component, inject, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { HotelData } from '../../core/services/hotel-data';
import { AmenityItem } from '../../shared/amenity-item/amenity-item';
import { CloudinaryImagePipe } from '../../shared/pipes/cloudinary-image-pipe';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [AmenityItem, CloudinaryImagePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  hotelData = inject(HotelData);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  featuredRooms = computed(() => this.hotelData.rooms().slice(0, 3));

  whatsappUrl = computed(() => {
    const phone = this.hotelData.info()?.phoneWhatsapp;
    if (!phone) return null;
    const text = encodeURIComponent('Hola, quisiera más información sobre disponibilidad y reservas.');
    return `https://wa.me/${phone}?text=${text}`;
  });

  constructor() {
    effect(() => {
      const info = this.hotelData.info();
      if (!info) return;

      this.titleService.setTitle(`${info.name} — ${info.slogan}`);
      this.metaService.updateTag({ name: 'description', content: info.description });
      this.setStructuredData(info);
      this.setCanonical('/');
    });
  }

  private setStructuredData(info: NonNullable<ReturnType<typeof this.hotelData.info>>): void {
    const existing = this.document.getElementById('structured-data');
    existing?.remove();

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Hotel',
      name: info.name,
      description: info.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: info.address,
        addressLocality: 'Armenia',
        addressRegion: 'Quindío',
        addressCountry: 'CO'
      },
      telephone: `+${info.phoneWhatsapp}`,
      amenityFeature: info.amenities.map(a => ({
        '@type': 'LocationFeatureSpecification',
        name: a.label,
        value: true
      }))
    };

    const script = this.document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
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