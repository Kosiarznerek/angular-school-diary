import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LessonsFormComponent} from './lessons-form.component';

describe('LessonsFormComponent', () => {
  let component: LessonsFormComponent;
  let fixture: ComponentFixture<LessonsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonsFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
