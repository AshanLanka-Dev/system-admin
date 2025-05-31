import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBreedsComponent } from './all-breeds.component';

describe('AllBreedsComponent', () => {
  let component: AllBreedsComponent;
  let fixture: ComponentFixture<AllBreedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBreedsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBreedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
