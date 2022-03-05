import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialSearchComponent } from './presidential-search.component';

describe('PresidentialSearchComponent', () => {
  let component: PresidentialSearchComponent;
  let fixture: ComponentFixture<PresidentialSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
