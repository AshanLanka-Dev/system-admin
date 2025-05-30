import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrograssSpinnerComponent } from './prograss-spinner.component';

describe('PrograssSpinnerComponent', () => {
  let component: PrograssSpinnerComponent;
  let fixture: ComponentFixture<PrograssSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrograssSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrograssSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
