import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachRolesToAdminComponent } from './attach-roles-to-admin.component';

describe('AttachRolesToAdminComponent', () => {
  let component: AttachRolesToAdminComponent;
  let fixture: ComponentFixture<AttachRolesToAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachRolesToAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachRolesToAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
