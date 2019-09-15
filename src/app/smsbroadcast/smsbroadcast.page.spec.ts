import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsbroadcastPage } from './smsbroadcast.page';

describe('SmsbroadcastPage', () => {
  let component: SmsbroadcastPage;
  let fixture: ComponentFixture<SmsbroadcastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsbroadcastPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsbroadcastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
