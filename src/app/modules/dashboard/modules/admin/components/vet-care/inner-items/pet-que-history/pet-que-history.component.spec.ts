import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetQueHistoryComponent } from './pet-que-history.component';

describe('PetQueHistoryComponent', () => {
  let component: PetQueHistoryComponent;
  let fixture: ComponentFixture<PetQueHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetQueHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetQueHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
