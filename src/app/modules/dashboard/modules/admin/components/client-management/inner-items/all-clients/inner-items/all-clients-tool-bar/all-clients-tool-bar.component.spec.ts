import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientsToolBarComponent } from './all-clients-tool-bar.component';

describe('AllClientsToolBarComponent', () => {
  let component: AllClientsToolBarComponent;
  let fixture: ComponentFixture<AllClientsToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllClientsToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllClientsToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
