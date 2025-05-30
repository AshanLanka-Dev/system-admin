import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMedicinesComponent } from './new-medicines.component';

describe('NewMedicinesComponent', () => {
  let component: NewMedicinesComponent;
  let fixture: ComponentFixture<NewMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMedicinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
