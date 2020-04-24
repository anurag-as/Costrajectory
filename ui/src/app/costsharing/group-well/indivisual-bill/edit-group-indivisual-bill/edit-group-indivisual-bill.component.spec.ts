import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupIndivisualBillComponent } from './edit-group-indivisual-bill.component';

describe('EditGroupIndivisualBillComponent', () => {
  let component: EditGroupIndivisualBillComponent;
  let fixture: ComponentFixture<EditGroupIndivisualBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroupIndivisualBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupIndivisualBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
