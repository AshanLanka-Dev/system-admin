import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaroselSecurityComponent } from './carosel-security.component';

describe('CaroselSecurityComponent', () => {
  let component: CaroselSecurityComponent;
  let fixture: ComponentFixture<CaroselSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaroselSecurityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaroselSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
