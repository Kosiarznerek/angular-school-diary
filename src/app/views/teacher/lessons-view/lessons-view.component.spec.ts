import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LessonsViewComponent} from './lessons-view.component';

describe('LessonsViewComponent', () => {
  let component: LessonsViewComponent;
  let fixture: ComponentFixture<LessonsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonsViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
