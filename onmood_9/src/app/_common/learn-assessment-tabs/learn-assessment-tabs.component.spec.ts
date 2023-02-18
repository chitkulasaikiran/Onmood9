import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnAssessmentTabsComponent } from './learn-assessment-tabs.component';

describe('LearnAssessmentTabsComponent', () => {
  let component: LearnAssessmentTabsComponent;
  let fixture: ComponentFixture<LearnAssessmentTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnAssessmentTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnAssessmentTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
