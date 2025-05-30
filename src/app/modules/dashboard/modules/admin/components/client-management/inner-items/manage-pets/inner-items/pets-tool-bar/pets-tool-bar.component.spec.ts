import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsToolBarComponent } from './pets-tool-bar.component';

describe('PetsToolBarComponent', () => {
  let component: PetsToolBarComponent;
  let fixture: ComponentFixture<PetsToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
