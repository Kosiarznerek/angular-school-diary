import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MarksViewsComponent} from './marks-views.component';

describe('MarksViewsComponent', () => {
  let component: MarksViewsComponent;
  let fixture: ComponentFixture<MarksViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarksViewsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
