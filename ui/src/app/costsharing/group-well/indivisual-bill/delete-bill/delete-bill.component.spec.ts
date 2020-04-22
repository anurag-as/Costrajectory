import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBillComponent } from './delete-bill.component';

describe('DeleteBillComponent', () => {
  let component: DeleteBillComponent;
  let fixture: ComponentFixture<DeleteBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
