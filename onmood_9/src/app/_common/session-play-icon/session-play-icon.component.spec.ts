import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionPlayIconComponent } from './session-play-icon.component';

describe('SessionPlayIconComponent', () => {
  let component: SessionPlayIconComponent;
  let fixture: ComponentFixture<SessionPlayIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionPlayIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionPlayIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
