import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineRequestToolBarComponent } from './online-request-tool-bar.component';

describe('OnlineRequestToolBarComponent', () => {
  let component: OnlineRequestToolBarComponent;
  let fixture: ComponentFixture<OnlineRequestToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineRequestToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineRequestToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
