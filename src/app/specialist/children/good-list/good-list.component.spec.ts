import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodListComponent } from './good-list.component';

describe('GoodListComponent', () => {
  let component: GoodListComponent;
  let fixture: ComponentFixture<GoodListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
