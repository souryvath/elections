import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipCandidateComponent } from './sponsorship-candidate.component';

describe('SponsorshipCandidateComponent', () => {
  let component: SponsorshipCandidateComponent;
  let fixture: ComponentFixture<SponsorshipCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorshipCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
