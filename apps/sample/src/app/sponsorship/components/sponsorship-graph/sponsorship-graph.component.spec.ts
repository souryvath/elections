import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipGraphComponent } from './sponsorship-graph.component';

describe('SponsorshipGraphComponent', () => {
  let component: SponsorshipGraphComponent;
  let fixture: ComponentFixture<SponsorshipGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorshipGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
