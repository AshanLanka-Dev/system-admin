import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueStatusComponent } from './que-status.component';

describe('QueStatusComponent', () => {
  let component: QueStatusComponent;
  let fixture: ComponentFixture<QueStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
