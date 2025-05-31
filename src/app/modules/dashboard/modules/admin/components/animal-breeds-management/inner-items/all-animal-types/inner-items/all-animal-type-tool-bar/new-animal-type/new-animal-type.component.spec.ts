import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnimalTypeComponent } from './new-animal-type.component';

describe('NewAnimalTypeComponent', () => {
  let component: NewAnimalTypeComponent;
  let fixture: ComponentFixture<NewAnimalTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAnimalTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAnimalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
