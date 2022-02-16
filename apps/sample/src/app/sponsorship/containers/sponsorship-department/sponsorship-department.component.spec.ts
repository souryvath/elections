import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipDepartmentComponent } from './sponsorship-department.component';

describe('SponsorshipDepartmentComponent', () => {
  let component: SponsorshipDepartmentComponent;
  let fixture: ComponentFixture<SponsorshipDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorshipDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
