import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MarksSubjectsComponent} from './marks-subjects.component';

describe('MarksSubjectsComponent', () => {
  let component: MarksSubjectsComponent;
  let fixture: ComponentFixture<MarksSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarksSubjectsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
