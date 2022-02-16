import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipHomeComponent } from './sponsorship-home.component';

describe('SponsorshipHomeComponent', () => {
  let component: SponsorshipHomeComponent;
  let fixture: ComponentFixture<SponsorshipHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorshipHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
