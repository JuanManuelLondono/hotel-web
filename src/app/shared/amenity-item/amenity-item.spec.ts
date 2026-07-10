import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenityItem } from './amenity-item';

describe('AmenityItem', () => {
  let component: AmenityItem;
  let fixture: ComponentFixture<AmenityItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmenityItem],
    }).compileComponents();

    fixture = TestBed.createComponent(AmenityItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
