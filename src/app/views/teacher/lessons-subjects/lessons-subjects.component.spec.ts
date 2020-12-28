import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LessonsSubjectsComponent} from './lessons-subjects.component';

describe('LessonsSubjectsComponent', () => {
  let component: LessonsSubjectsComponent;
  let fixture: ComponentFixture<LessonsSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonsSubjectsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
