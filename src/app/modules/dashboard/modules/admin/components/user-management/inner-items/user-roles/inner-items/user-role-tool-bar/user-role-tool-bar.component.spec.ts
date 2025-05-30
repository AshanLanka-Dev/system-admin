import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleToolBarComponent } from './user-role-tool-bar.component';

describe('UserRoleToolBarComponent', () => {
  let component: UserRoleToolBarComponent;
  let fixture: ComponentFixture<UserRoleToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
