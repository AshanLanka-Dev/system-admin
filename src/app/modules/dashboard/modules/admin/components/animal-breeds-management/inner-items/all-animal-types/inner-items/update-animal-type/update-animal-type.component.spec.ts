import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnimalTypeComponent } from './update-animal-type.component';

describe('UpdateAnimalTypeComponent', () => {
  let component: UpdateAnimalTypeComponent;
  let fixture: ComponentFixture<UpdateAnimalTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAnimalTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAnimalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
