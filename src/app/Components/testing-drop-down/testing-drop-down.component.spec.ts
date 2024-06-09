import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingDropDownComponent } from './testing-drop-down.component';

describe('TestingDropDownComponent', () => {
  let component: TestingDropDownComponent;
  let fixture: ComponentFixture<TestingDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingDropDownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestingDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
