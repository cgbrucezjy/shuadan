import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BougtDialogComponent } from './bougt-dialog.component';

describe('BougtDialogComponent', () => {
  let component: BougtDialogComponent;
  let fixture: ComponentFixture<BougtDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BougtDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BougtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
