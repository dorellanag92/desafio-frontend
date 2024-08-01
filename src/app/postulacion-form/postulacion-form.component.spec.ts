import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulacionFormComponent } from './postulacion-form.component';

describe('PostulacionFormComponent', () => {
  let component: PostulacionFormComponent;
  let fixture: ComponentFixture<PostulacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostulacionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
