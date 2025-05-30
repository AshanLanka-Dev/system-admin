import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReceptionistsComponent } from './update-receptionists.component';

describe('UpdateReceptionistsComponent', () => {
  let component: UpdateReceptionistsComponent;
  let fixture: ComponentFixture<UpdateReceptionistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateReceptionistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReceptionistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
