import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetCareComponent } from './vet-care.component';

describe('VetCareComponent', () => {
  let component: VetCareComponent;
  let fixture: ComponentFixture<VetCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetCareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
