import { Component, inject, signal, computed, effect, OnInit, OnDestroy } from '@angular/core';
import { HotelData } from '../../core/services/hotel-data';
import { AmenityItem } from '../../shared/amenity-item/amenity-item';
import { CloudinaryImagePipe } from '../../shared/pipes/cloudinary-image-pipe';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GalleryImage } from '../../models/room';
@Component({
  selector: 'app-home',
  imports: [AmenityItem, CloudinaryImagePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  hotelData = inject(HotelData);

  private titleService = inject(Title);
  private metaService = inject(Meta);

  private document = inject(DOCUMENT);

  private activeIndex = signal(0);
  private intervalId?: ReturnType<typeof setInterval>;

  // imagen actualmente visible, recalculada cuando cambia el índice o llegan los datos
  currentImage = computed(() => {
    const images = this.hotelData.info()?.heroImages ?? [];
    return images[this.activeIndex()];
  });

  totalImages = computed(() => this.hotelData.info()?.heroImages?.length ?? 0);
  activeIndexValue = computed(() => this.activeIndex());

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

  private setCanonical(path: string): void {
    let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', `${environment.siteUrl}${path}`);
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
