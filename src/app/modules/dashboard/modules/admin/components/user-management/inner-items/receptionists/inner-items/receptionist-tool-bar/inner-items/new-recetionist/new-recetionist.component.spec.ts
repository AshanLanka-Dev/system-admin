import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecetionistComponent } from './new-recetionist.component';

describe('NewRecetionistComponent', () => {
  let component: NewRecetionistComponent;
  let fixture: ComponentFixture<NewRecetionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRecetionistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRecetionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
