import { Component, inject, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { HotelData } from '../../core/services/hotel-data';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reservar',
  imports: [FormsModule],
  templateUrl: './reservar.html',
  styleUrl: './reservar.scss'
})
export class Reservar {
  hotelData = inject(HotelData);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  guestName = signal('');
  checkIn = signal('');
  checkOut = signal('');
  selectedRoomId = signal<number | null>(null);
  message = signal('');

  submitted = signal(false);

  today = computed(() => new Date().toISOString().split('T')[0]);

  nameValid = computed(() => this.guestName().trim().length > 0);
  checkInValid = computed(() => this.checkIn() !== '' && this.checkIn() >= this.today());
  checkOutValid = computed(() => this.checkOut() !== '' && this.checkOut() > this.checkIn());
  messageValid = computed(() => this.message().trim().length > 0);

  formValid = computed(() =>
    this.nameValid() && this.checkInValid() && this.checkOutValid() && this.messageValid()
  );

  whatsappUrl = computed(() => {
    const phone = this.hotelData.info()?.phoneWhatsapp;
    if (!phone) return null;
    const text = encodeURIComponent('Hola, quisiera más información sobre disponibilidad y reservas.');
    return `https://wa.me/${phone}?text=${text}`;
  });

  mailtoUrl = computed(() => {
    const info = this.hotelData.info();
    if (!info) return null;

    const room = this.hotelData.rooms().find(r => r.id === this.selectedRoomId());
    const roomLine = room ? `Habitación de interés: ${room.name}\n` : '';
    const datesLine = `Fechas: ${this.checkIn()} a ${this.checkOut()}\n`;

    const subject = `Solicitud de reserva — ${this.guestName()}`;
    const body =
      `Nombre: ${this.guestName()}\n` +
      roomLine +
      datesLine +
      `\nMensaje:\n${this.message()}`;

    return `mailto:${info.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  onSubmitEmail(event: Event): void {
    this.submitted.set(true);
    if (!this.formValid()) {
      event.preventDefault();
    }
  }

  constructor() {
    effect(() => {
      const info = this.hotelData.info();
      if (!info) return;

      this.setOpenGraph(info, '/reservar');
      this.titleService.setTitle(`Reservar — ${info.name}`);
      this.metaService.updateTag({
        name: 'description',
        content: `Reserva tu habitación en ${info.name} por WhatsApp o correo electrónico. Respuesta rápida y directa.`
      });
      this.setCanonical('/reservar');
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
    const imageUrl = `https://res.cloudinary.com/${environment.cloudinaryCloudName}/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/${info.heroImage}`;
    const pageUrl = `${environment.siteUrl}${path}`;
    const title = `Reservar — ${info.name}`;
    const description = `Reserva tu habitación en ${info.name} por WhatsApp o correo electrónico.`;

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