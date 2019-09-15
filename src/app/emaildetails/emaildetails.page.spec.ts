import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmaildetailsPage } from './emaildetails.page';

describe('EmaildetailsPage', () => {
  let component: EmaildetailsPage;
  let fixture: ComponentFixture<EmaildetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmaildetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmaildetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
