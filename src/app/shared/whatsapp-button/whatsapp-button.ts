import { Component, inject, computed } from '@angular/core';
import { HotelData } from '../../core/services/hotel-data';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.scss'
})
export class WhatsappButton {
  private hotelData = inject(HotelData);

  whatsappUrl = computed(() => {
    const phone = this.hotelData.info()?.phoneWhatsapp;
    if (!phone) return null;

    const message = encodeURIComponent(
      `Hola, quisiera más información sobre disponibilidad y reservas.`
    );
    return `https://wa.me/${phone}?text=${message}`;
  });
}