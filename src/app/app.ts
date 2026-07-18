import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WhatsappButton } from './shared/whatsapp-button/whatsapp-button';
import { Navbar } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WhatsappButton, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('hotel-web');
}
