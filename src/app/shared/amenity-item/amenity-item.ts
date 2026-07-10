import { Component, input } from '@angular/core';

@Component({
  selector: 'app-amenity-item',
  templateUrl: './amenity-item.html',
  styleUrl: './amenity-item.scss'
})
export class AmenityItem {
  icon = input.required<string>();
  label = input.required<string>();
}
