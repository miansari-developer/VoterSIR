import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SirStatusResult } from './sir-status-result';

describe('SirStatusResult', () => {
  let component: SirStatusResult;
  let fixture: ComponentFixture<SirStatusResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SirStatusResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SirStatusResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
