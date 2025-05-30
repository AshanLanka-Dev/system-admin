import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevanueChartComponent } from './revanue-chart.component';

describe('RevanueChartComponent', () => {
  let component: RevanueChartComponent;
  let fixture: ComponentFixture<RevanueChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevanueChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevanueChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
