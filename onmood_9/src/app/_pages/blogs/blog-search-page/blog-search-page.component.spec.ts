import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSearchPageComponent } from './blog-search-page.component';

describe('BlogSearchPageComponent', () => {
  let component: BlogSearchPageComponent;
  let fixture: ComponentFixture<BlogSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
