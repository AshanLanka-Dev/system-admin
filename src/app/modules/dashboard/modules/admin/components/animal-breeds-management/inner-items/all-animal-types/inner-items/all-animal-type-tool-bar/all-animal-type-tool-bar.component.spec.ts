import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnimalTypeToolBarComponent } from './all-animal-type-tool-bar.component';

describe('AllAnimalTypeToolBarComponent', () => {
  let component: AllAnimalTypeToolBarComponent;
  let fixture: ComponentFixture<AllAnimalTypeToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAnimalTypeToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAnimalTypeToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
