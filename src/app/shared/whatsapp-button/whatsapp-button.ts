import { Component, inject, computed, signal, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { HotelData } from '../../core/services/hotel-data';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.scss'
})
export class WhatsappButton {
  private hotelData = inject(HotelData);
  private router = inject(Router);

  message = input<string>('¡Reserva tu habitación aquí!');
  bubbleVisible = signal(true);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  isVisible = computed(() => !this.currentUrl().startsWith('/reservar'));

  whatsappUrl = computed(() => {
    const phone = this.hotelData.info()?.phoneWhatsapp;
    if (!phone) return null;

    const text = encodeURIComponent(
      `Hola, quisiera más información sobre disponibilidad y reservas.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  });

  dismissBubble(event: Event): void {
    event.stopPropagation();
    this.bubbleVisible.set(false);
  }
}