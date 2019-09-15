import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayanniversaryPage } from './birthdayanniversary.page';

describe('BirthdayanniversaryPage', () => {
  let component: BirthdayanniversaryPage;
  let fixture: ComponentFixture<BirthdayanniversaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthdayanniversaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayanniversaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
