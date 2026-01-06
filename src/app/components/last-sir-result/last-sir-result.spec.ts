import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSirResult } from './last-sir-result';

describe('LastSirResult', () => {
  let component: LastSirResult;
  let fixture: ComponentFixture<LastSirResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastSirResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastSirResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
