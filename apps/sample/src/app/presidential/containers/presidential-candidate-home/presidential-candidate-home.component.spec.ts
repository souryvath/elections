import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialCandidateHomeComponent } from './presidential-candidate-home.component';

describe('PresidentialCandidateHomeComponent', () => {
  let component: PresidentialCandidateHomeComponent;
  let fixture: ComponentFixture<PresidentialCandidateHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialCandidateHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialCandidateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
