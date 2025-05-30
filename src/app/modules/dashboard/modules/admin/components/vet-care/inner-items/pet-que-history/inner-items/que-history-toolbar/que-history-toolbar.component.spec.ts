import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueHistoryToolbarComponent } from './que-history-toolbar.component';

describe('QueHistoryToolbarComponent', () => {
  let component: QueHistoryToolbarComponent;
  let fixture: ComponentFixture<QueHistoryToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueHistoryToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueHistoryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
