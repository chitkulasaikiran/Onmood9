import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGroupComponent } from './course-group.component';

describe('CourseGroupComponent', () => {
  let component: CourseGroupComponent;
  let fixture: ComponentFixture<CourseGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
