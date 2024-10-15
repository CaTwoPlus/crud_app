import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusorComponent } from './musor.component';

describe('MusorComponent', () => {
  let component: MusorComponent;
  let fixture: ComponentFixture<MusorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusorComponent]
    });
    fixture = TestBed.createComponent(MusorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
