import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotlineComponent } from './dotline.component';

describe('DotlineComponent', () => {
  let component: DotlineComponent;
  let fixture: ComponentFixture<DotlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
