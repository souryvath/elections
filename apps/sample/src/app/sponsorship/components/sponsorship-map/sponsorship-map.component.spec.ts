import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipMapComponent } from './sponsorship-map.component';

describe('SponsorshipMapComponent', () => {
  let component: SponsorshipMapComponent;
  let fixture: ComponentFixture<SponsorshipMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorshipMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
