import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSirHistory } from './last-sir-history';

describe('LastSirHistory', () => {
  let component: LastSirHistory;
  let fixture: ComponentFixture<LastSirHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastSirHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastSirHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
