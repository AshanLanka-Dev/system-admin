import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOnlineReqToolBarComponent } from './pending-online-req-tool-bar.component';

describe('PendingOnlineReqToolBarComponent', () => {
  let component: PendingOnlineReqToolBarComponent;
  let fixture: ComponentFixture<PendingOnlineReqToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingOnlineReqToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingOnlineReqToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
