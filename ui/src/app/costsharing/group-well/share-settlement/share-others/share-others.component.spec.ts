import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareOthersComponent } from './share-others.component';

describe('ShareOthersComponent', () => {
  let component: ShareOthersComponent;
  let fixture: ComponentFixture<ShareOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
