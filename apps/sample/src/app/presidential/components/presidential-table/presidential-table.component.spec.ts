import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialTableComponent } from './presidential-table.component';

describe('PresidentialTableComponent', () => {
  let component: PresidentialTableComponent;
  let fixture: ComponentFixture<PresidentialTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
