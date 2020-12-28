import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LessonsClassesComponent} from './lessons-classes.component';

describe('LessonsClassesComponent', () => {
  let component: LessonsClassesComponent;
  let fixture: ComponentFixture<LessonsClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonsClassesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
