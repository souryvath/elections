import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialProgressResultComponent } from './presidential-progress-result.component';

describe('PresidentialProgressResultComponent', () => {
  let component: PresidentialProgressResultComponent;
  let fixture: ComponentFixture<PresidentialProgressResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialProgressResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialProgressResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
