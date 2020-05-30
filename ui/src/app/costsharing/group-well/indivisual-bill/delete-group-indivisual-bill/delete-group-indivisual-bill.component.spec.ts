import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGroupIndivisualBillComponent } from './delete-group-indivisual-bill.component';

describe('DeleteGroupIndivisualBillComponent', () => {
  let component: DeleteGroupIndivisualBillComponent;
  let fixture: ComponentFixture<DeleteGroupIndivisualBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteGroupIndivisualBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGroupIndivisualBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
