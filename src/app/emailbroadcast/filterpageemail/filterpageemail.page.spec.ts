import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterpageemailPage } from './filterpageemail.page';

describe('FilterpageemailPage', () => {
  let component: FilterpageemailPage;
  let fixture: ComponentFixture<FilterpageemailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterpageemailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterpageemailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
