import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSettlementHistoryComponent } from './share-settlement-history.component';

describe('ShareSettlementHistoryComponent', () => {
  let component: ShareSettlementHistoryComponent;
  let fixture: ComponentFixture<ShareSettlementHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareSettlementHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareSettlementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
