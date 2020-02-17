import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TippspielComponent } from './tippspiel.component';

describe('TippspielComponent', () => {
  let component: TippspielComponent;
  let fixture: ComponentFixture<TippspielComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TippspielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TippspielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
