import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartClasses } from './smart-classes.component';

describe('SmartClasses', () => {
  let component: SmartClasses;
  let fixture: ComponentFixture<SmartClasses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartClasses],
    }).compileComponents();

    fixture = TestBed.createComponent(SmartClasses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
