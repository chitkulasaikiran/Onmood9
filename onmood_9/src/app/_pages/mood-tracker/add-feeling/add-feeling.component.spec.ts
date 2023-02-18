import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeelingComponent } from './add-feeling.component';

describe('AddFeelingComponent', () => {
  let component: AddFeelingComponent;
  let fixture: ComponentFixture<AddFeelingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeelingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
