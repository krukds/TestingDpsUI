import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTestingModalComponent } from './add-edit-testing-modal.component';

describe('AddEditTestingModalComponent', () => {
  let component: AddEditTestingModalComponent;
  let fixture: ComponentFixture<AddEditTestingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTestingModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditTestingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
