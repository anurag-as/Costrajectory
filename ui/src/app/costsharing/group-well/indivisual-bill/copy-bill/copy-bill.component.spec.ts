import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyBillComponent } from './copy-bill.component';

describe('CopyBillComponent', () => {
  let component: CopyBillComponent;
  let fixture: ComponentFixture<CopyBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
