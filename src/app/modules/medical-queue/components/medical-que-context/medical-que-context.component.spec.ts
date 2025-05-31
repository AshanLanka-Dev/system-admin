import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalQueContextComponent } from './medical-que-context.component';

describe('MedicalQueContextComponent', () => {
  let component: MedicalQueContextComponent;
  let fixture: ComponentFixture<MedicalQueContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalQueContextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalQueContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
