import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFbLoginComponent } from './test-fb-login.component';

describe('TestFbLoginComponent', () => {
  let component: TestFbLoginComponent;
  let fixture: ComponentFixture<TestFbLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestFbLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestFbLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
