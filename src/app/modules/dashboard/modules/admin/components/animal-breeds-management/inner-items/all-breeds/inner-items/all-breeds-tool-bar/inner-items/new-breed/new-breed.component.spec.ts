import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBreedComponent } from './new-breed.component';

describe('NewBreedComponent', () => {
  let component: NewBreedComponent;
  let fixture: ComponentFixture<NewBreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBreedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
