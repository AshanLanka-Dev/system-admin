import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerCardsComponent } from './trainer-cards.component';

describe('TrainerCardsComponent', () => {
  let component: TrainerCardsComponent;
  let fixture: ComponentFixture<TrainerCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
