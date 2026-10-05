/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserBoardComponent } from './user-board.component';

describe('UserBoardComponent', () => {
  let component: UserBoardComponent;
  let fixture: ComponentFixture<UserBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserBoardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
