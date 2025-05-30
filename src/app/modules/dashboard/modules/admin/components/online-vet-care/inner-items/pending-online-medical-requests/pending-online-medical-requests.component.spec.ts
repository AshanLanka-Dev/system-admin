import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOnlineMedicalRequestsComponent } from './pending-online-medical-requests.component';

describe('PendingOnlineMedicalRequestsComponent', () => {
  let component: PendingOnlineMedicalRequestsComponent;
  let fixture: ComponentFixture<PendingOnlineMedicalRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingOnlineMedicalRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingOnlineMedicalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
