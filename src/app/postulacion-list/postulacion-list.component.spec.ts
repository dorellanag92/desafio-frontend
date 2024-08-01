/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostulacionListComponent } from './postulacion-list.component';

describe('PostulacionListComponent', () => {
  let component: PostulacionListComponent;
  let fixture: ComponentFixture<PostulacionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulacionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
