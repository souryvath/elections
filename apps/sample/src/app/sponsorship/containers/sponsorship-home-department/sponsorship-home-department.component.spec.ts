import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipHomeDepartmentComponent } from './sponsorship-home-department.component';

describe('SponsorshipHomeDepartmentComponent', () => {
  let component: SponsorshipHomeDepartmentComponent;
  let fixture: ComponentFixture<SponsorshipHomeDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorshipHomeDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipHomeDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
