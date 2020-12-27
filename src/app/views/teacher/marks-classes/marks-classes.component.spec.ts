import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MarksClassesComponent} from './marks-classes.component';

describe('MarksClassesComponent', () => {
  let component: MarksClassesComponent;
  let fixture: ComponentFixture<MarksClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarksClassesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
