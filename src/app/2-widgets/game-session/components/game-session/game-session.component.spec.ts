/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GameSessionComponent } from './game-session.component';

describe('GameSessionComponent', () => {
  let component: GameSessionComponent;
  let fixture: ComponentFixture<GameSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
