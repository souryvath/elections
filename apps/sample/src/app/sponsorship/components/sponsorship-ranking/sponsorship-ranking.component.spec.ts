import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipRankingComponent } from './sponsorship-ranking.component';

describe('SponsorshipRankingComponent', () => {
  let component: SponsorshipRankingComponent;
  let fixture: ComponentFixture<SponsorshipRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorshipRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
