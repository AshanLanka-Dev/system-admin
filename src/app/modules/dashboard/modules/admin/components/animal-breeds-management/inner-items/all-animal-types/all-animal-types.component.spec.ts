import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnimalTypesComponent } from './all-animal-types.component';

describe('AllAnimalTypesComponent', () => {
  let component: AllAnimalTypesComponent;
  let fixture: ComponentFixture<AllAnimalTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAnimalTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAnimalTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
