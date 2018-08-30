import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdCardComponent } from './sd-card.component';

describe('SdCardComponent', () => {
  let component: SdCardComponent;
  let fixture: ComponentFixture<SdCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
