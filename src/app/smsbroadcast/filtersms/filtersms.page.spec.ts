import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersmsPage } from './filtersms.page';

describe('FiltersmsPage', () => {
  let component: FiltersmsPage;
  let fixture: ComponentFixture<FiltersmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersmsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
