import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishcardPage } from './wishcard.page';

describe('WishcardPage', () => {
  let component: WishcardPage;
  let fixture: ComponentFixture<WishcardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishcardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
