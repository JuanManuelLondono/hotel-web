import { Component, inject, computed, input, signal } from '@angular/core';
import { HotelData } from '../../core/services/hotel-data';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.scss'
})
export class WhatsappButton {
  private hotelData = inject(HotelData);

  message = input<string>('¡Reserva tu habitación aquí!');
  bubbleVisible = signal(true);

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