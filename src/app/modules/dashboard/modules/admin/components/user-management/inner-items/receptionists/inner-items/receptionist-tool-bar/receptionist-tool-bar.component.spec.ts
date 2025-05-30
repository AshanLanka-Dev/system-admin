import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistToolBarComponent } from './receptionist-tool-bar.component';

describe('ReceptionistToolBarComponent', () => {
  let component: ReceptionistToolBarComponent;
  let fixture: ComponentFixture<ReceptionistToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
