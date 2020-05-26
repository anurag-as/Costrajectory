import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareOweComponent } from './share-owe.component';

describe('ShareOweComponent', () => {
  let component: ShareOweComponent;
  let fixture: ComponentFixture<ShareOweComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareOweComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareOweComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
