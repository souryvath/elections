import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialRoundComponent } from './presidential-round.component';

describe('PresidentialRoundComponent', () => {
  let component: PresidentialRoundComponent;
  let fixture: ComponentFixture<PresidentialRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialRoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
