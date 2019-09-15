import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpartyPage } from './addparty.page';

describe('AddpartyPage', () => {
  let component: AddpartyPage;
  let fixture: ComponentFixture<AddpartyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpartyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpartyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
