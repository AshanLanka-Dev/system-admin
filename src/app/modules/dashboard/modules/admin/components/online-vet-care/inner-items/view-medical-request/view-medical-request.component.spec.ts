import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicalRequestComponent } from './view-medical-request.component';

describe('ViewMedicalRequestComponent', () => {
  let component: ViewMedicalRequestComponent;
  let fixture: ComponentFixture<ViewMedicalRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMedicalRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMedicalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
