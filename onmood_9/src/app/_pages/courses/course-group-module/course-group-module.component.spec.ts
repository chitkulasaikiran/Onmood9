import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGroupModuleComponent } from './course-group-module.component';

describe('CourseGroupModuleComponent', () => {
  let component: CourseGroupModuleComponent;
  let fixture: ComponentFixture<CourseGroupModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseGroupModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseGroupModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
