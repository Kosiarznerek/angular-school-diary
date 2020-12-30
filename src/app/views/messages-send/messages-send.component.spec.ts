import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesSendComponent} from './messages-send.component';

describe('MessagesSendComponent', () => {
  let component: MessagesSendComponent;
  let fixture: ComponentFixture<MessagesSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesSendComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
