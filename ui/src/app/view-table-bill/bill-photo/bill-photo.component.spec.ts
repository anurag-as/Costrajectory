import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPhotoComponent } from './bill-photo.component';

describe('BillPhotoComponent', () => {
  let component: BillPhotoComponent;
  let fixture: ComponentFixture<BillPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
