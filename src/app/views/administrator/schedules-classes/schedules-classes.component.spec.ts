import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SchedulesClassesComponent} from './schedules-classes.component';

describe('SchedulesClassesComponent', () => {
  let component: SchedulesClassesComponent;
  let fixture: ComponentFixture<SchedulesClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchedulesClassesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
