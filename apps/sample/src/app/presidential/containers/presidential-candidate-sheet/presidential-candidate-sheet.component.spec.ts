import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialCandidateSheetComponent } from './presidential-candidate-sheet.component';

describe('PresidentialCandidateSheetComponent', () => {
  let component: PresidentialCandidateSheetComponent;
  let fixture: ComponentFixture<PresidentialCandidateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialCandidateSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialCandidateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
