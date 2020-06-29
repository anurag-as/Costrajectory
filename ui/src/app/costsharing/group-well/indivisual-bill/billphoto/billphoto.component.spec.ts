import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillphotoComponent } from './billphoto.component';

describe('BillphotoComponent', () => {
  let component: BillphotoComponent;
  let fixture: ComponentFixture<BillphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
