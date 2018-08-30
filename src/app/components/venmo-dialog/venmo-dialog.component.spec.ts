import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenmoDialogComponent } from './venmo-dialog.component';

describe('VenmoDialogComponent', () => {
  let component: VenmoDialogComponent;
  let fixture: ComponentFixture<VenmoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenmoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenmoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
