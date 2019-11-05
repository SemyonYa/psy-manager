import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodComponent } from './good.component';

describe('GoodComponent', () => {
  let component: GoodComponent;
  let fixture: ComponentFixture<GoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
