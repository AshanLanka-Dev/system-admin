import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalQueListComponent } from './medical-que-list.component';

describe('MedicalQueListComponent', () => {
  let component: MedicalQueListComponent;
  let fixture: ComponentFixture<MedicalQueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalQueListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalQueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
