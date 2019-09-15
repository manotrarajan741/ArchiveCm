import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailbroadcastPage } from './emailbroadcast.page';

describe('EmailbroadcastPage', () => {
  let component: EmailbroadcastPage;
  let fixture: ComponentFixture<EmailbroadcastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailbroadcastPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailbroadcastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
