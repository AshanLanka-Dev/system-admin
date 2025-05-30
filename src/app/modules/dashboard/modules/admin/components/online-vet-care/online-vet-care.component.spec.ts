import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineVetCareComponent } from './online-vet-care.component';

describe('OnlineVetCareComponent', () => {
  let component: OnlineVetCareComponent;
  let fixture: ComponentFixture<OnlineVetCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineVetCareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineVetCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
