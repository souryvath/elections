import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialCandidateMapComponent } from './presidential-candidate-map.component';

describe('PresidentialCandidateMapComponent', () => {
  let component: PresidentialCandidateMapComponent;
  let fixture: ComponentFixture<PresidentialCandidateMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialCandidateMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialCandidateMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
