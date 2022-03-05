import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialComponent } from './presidential.component';

describe('PresidentialComponent', () => {
  let component: PresidentialComponent;
  let fixture: ComponentFixture<PresidentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
