import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPostalCodeComponent } from './search-postal-code.component';

describe('SearchPostalCodeComponent', () => {
  let component: SearchPostalCodeComponent;
  let fixture: ComponentFixture<SearchPostalCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPostalCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPostalCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
