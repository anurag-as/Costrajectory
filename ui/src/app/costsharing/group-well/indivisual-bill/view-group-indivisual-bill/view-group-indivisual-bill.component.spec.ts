import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupIndivisualBillComponent } from './view-group-indivisual-bill.component';

describe('ViewGroupIndivisualBillComponent', () => {
  let component: ViewGroupIndivisualBillComponent;
  let fixture: ComponentFixture<ViewGroupIndivisualBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGroupIndivisualBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroupIndivisualBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
