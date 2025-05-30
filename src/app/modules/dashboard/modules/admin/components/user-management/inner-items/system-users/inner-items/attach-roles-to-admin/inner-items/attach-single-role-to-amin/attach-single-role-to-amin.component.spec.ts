import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachSingleRoleToAminComponent } from './attach-single-role-to-amin.component';

describe('AttachSingleRoleToAminComponent', () => {
  let component: AttachSingleRoleToAminComponent;
  let fixture: ComponentFixture<AttachSingleRoleToAminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachSingleRoleToAminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachSingleRoleToAminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
