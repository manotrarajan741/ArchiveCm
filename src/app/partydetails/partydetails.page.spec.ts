import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartydetailsPage } from './partydetails.page';

describe('PartydetailsPage', () => {
  let component: PartydetailsPage;
  let fixture: ComponentFixture<PartydetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartydetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartydetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
