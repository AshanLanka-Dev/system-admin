import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalBreedsManagementComponent } from './animal-breeds-management.component';

describe('AnimalBreedsManagementComponent', () => {
  let component: AnimalBreedsManagementComponent;
  let fixture: ComponentFixture<AnimalBreedsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalBreedsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalBreedsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
