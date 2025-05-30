import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOnlineMedicalRequestsComponent } from './all-online-medical-requests.component';

describe('AllOnlineMedicalRequestsComponent', () => {
  let component: AllOnlineMedicalRequestsComponent;
  let fixture: ComponentFixture<AllOnlineMedicalRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOnlineMedicalRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOnlineMedicalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
