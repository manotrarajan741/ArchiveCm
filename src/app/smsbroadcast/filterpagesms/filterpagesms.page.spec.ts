import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterpagesmsPage } from './filterpagesms.page';

describe('FilterpagesmsPage', () => {
  let component: FilterpagesmsPage;
  let fixture: ComponentFixture<FilterpagesmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterpagesmsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterpagesmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
