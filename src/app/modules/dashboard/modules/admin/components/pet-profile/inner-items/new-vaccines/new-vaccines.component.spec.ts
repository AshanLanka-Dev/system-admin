import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVaccinesComponent } from './new-vaccines.component';

describe('NewVaccinesComponent', () => {
  let component: NewVaccinesComponent;
  let fixture: ComponentFixture<NewVaccinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewVaccinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
