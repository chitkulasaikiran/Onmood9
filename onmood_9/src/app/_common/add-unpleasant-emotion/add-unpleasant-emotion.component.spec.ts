import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  AddUnpleasantEmotionComponent } from './add-unpleasant-emotion.component';

describe('AddEmotionComponent', () => {
  let component: AddUnpleasantEmotionComponent;
  let fixture: ComponentFixture<AddUnpleasantEmotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUnpleasantEmotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnpleasantEmotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
