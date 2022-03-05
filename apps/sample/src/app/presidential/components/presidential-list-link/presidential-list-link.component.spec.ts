import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialListLinkComponent } from './presidential-list-link.component';

describe('PresidentialListLinkComponent', () => {
  let component: PresidentialListLinkComponent;
  let fixture: ComponentFixture<PresidentialListLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialListLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialListLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
