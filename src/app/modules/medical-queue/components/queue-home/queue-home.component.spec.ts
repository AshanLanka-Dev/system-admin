import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueHomeComponent } from './queue-home.component';

describe('QueueHomeComponent', () => {
  let component: QueueHomeComponent;
  let fixture: ComponentFixture<QueueHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueueHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
