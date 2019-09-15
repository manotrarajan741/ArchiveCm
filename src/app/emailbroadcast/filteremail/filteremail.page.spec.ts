import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteremailPage } from './filteremail.page';

describe('FilteremailPage', () => {
  let component: FilteremailPage;
  let fixture: ComponentFixture<FilteremailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteremailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteremailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
