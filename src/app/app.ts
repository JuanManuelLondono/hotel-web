import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WhatsappButton } from './shared/whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WhatsappButton],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('hotel-web');
}
