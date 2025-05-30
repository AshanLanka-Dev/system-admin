import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserLogComponent } from './view-user-log.component';

describe('ViewUserLogComponent', () => {
  let component: ViewUserLogComponent;
  let fixture: ComponentFixture<ViewUserLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
