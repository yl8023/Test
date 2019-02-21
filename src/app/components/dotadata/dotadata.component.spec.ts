import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotadataComponent } from './dotadata.component';

describe('DotadataComponent', () => {
  let component: DotadataComponent;
  let fixture: ComponentFixture<DotadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
