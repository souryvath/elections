import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialSheetComponent } from './presidential-sheet.component';

describe('PresidentialSheetComponent', () => {
  let component: PresidentialSheetComponent;
  let fixture: ComponentFixture<PresidentialSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
