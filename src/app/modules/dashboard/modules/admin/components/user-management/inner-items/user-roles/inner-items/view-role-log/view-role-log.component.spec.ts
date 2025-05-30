import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoleLogComponent } from './view-role-log.component';

describe('ViewRoleLogComponent', () => {
  let component: ViewRoleLogComponent;
  let fixture: ComponentFixture<ViewRoleLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRoleLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
