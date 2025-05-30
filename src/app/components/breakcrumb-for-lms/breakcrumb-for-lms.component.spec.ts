import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakcrumbForLmsComponent } from './breakcrumb-for-lms.component';

describe('BreakcrumbForLmsComponent', () => {
  let component: BreakcrumbForLmsComponent;
  let fixture: ComponentFixture<BreakcrumbForLmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakcrumbForLmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakcrumbForLmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
