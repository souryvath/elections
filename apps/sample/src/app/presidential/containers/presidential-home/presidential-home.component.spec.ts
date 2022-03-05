import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialHomeComponent } from './presidential-home.component';

describe('PresidentialHomeComponent', () => {
  let component: PresidentialHomeComponent;
  let fixture: ComponentFixture<PresidentialHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
