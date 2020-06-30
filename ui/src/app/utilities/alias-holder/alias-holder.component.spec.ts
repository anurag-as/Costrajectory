import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AliasHolderComponent } from './alias-holder.component';

describe('AliasHolderComponent', () => {
  let component: AliasHolderComponent;
  let fixture: ComponentFixture<AliasHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AliasHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AliasHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
