import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalQueueToolBarComponent } from './medical-queue-tool-bar.component';

describe('MedicalQueueToolBarComponent', () => {
  let component: MedicalQueueToolBarComponent;
  let fixture: ComponentFixture<MedicalQueueToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalQueueToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalQueueToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
