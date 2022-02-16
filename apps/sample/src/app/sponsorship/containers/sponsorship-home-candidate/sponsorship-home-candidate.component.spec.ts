import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipHomeCandidateComponent } from './sponsorship-home-candidate.component';

describe('SponsorshipHomeCandidateComponent', () => {
  let component: SponsorshipHomeCandidateComponent;
  let fixture: ComponentFixture<SponsorshipHomeCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorshipHomeCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipHomeCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
