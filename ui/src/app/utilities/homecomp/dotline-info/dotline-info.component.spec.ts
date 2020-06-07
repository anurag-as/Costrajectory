import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotlineInfoComponent } from './dotline-info.component';

describe('DotlineInfoComponent', () => {
  let component: DotlineInfoComponent;
  let fixture: ComponentFixture<DotlineInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotlineInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotlineInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
