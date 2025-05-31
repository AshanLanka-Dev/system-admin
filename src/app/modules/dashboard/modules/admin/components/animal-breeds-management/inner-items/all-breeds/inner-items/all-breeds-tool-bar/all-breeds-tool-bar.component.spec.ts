import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBreedsToolBarComponent } from './all-breeds-tool-bar.component';

describe('AllBreedsToolBarComponent', () => {
  let component: AllBreedsToolBarComponent;
  let fixture: ComponentFixture<AllBreedsToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBreedsToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBreedsToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
