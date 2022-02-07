import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAdsComponent } from './article-ads.component';

describe('ArticleAdsComponent', () => {
  let component: ArticleAdsComponent;
  let fixture: ComponentFixture<ArticleAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
