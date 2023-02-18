import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGroupModuleSessionComponent } from './course-group-module-session.component';

describe('CourseGroupModuleSessionComponent', () => {
  let component: CourseGroupModuleSessionComponent;
  let fixture: ComponentFixture<CourseGroupModuleSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseGroupModuleSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseGroupModuleSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
