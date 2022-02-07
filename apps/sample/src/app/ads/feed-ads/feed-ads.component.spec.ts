import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedAdsComponent } from './feed-ads.component';

describe('FeedAdsComponent', () => {
  let component: FeedAdsComponent;
  let fixture: ComponentFixture<FeedAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
