import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingSettingsComponent } from './testing-settings.component';

describe('TestingSettingsComponent', () => {
  let component: TestingSettingsComponent;
  let fixture: ComponentFixture<TestingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
