import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUserToolBarComponent } from './system-user-tool-bar.component';

describe('SystemUserToolBarComponent', () => {
  let component: SystemUserToolBarComponent;
  let fixture: ComponentFixture<SystemUserToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemUserToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemUserToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
