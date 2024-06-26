import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAdminComponent } from './test-admin.component';

describe('TestAdminComponent', () => {
  let component: TestAdminComponent;
  let fixture: ComponentFixture<TestAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
