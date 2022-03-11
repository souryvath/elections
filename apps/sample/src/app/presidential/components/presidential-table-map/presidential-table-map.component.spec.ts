import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialTableMapComponent } from './presidential-table-map.component';

describe('PresidentialTableMapComponent', () => {
  let component: PresidentialTableMapComponent;
  let fixture: ComponentFixture<PresidentialTableMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialTableMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialTableMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
