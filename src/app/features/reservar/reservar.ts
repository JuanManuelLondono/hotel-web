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
    const datesLine = (this.checkIn() || this.checkOut())
      ? `Fechas: ${this.checkIn() || '(sin definir)'} a ${this.checkOut() || '(sin definir)'}\n`
      : '';

    const subject = `Solicitud de reserva — ${this.guestName() || 'Sin nombre'}`;
    const body =
      `Nombre: ${this.guestName()}\n` +
      roomLine +
      datesLine +
      `\nMensaje:\n${this.message()}`;

    return `mailto:${info.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  constructor() {
    effect(() => {
      const info = this.hotelData.info();
      if (!info) return;

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
}