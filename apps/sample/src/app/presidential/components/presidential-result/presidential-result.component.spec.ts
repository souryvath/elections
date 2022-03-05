import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialResultComponent } from './presidential-result.component';

describe('PresidentialResultComponent', () => {
  let component: PresidentialResultComponent;
  let fixture: ComponentFixture<PresidentialResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
