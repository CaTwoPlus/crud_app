import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatogatoComponent } from './latogato.component';

describe('LatogatoComponent', () => {
  let component: LatogatoComponent;
  let fixture: ComponentFixture<LatogatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LatogatoComponent]
    });
    fixture = TestBed.createComponent(LatogatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
