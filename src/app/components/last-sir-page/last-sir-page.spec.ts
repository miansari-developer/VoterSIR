import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSirPage } from './last-sir-page';

describe('LastSirPage', () => {
  let component: LastSirPage;
  let fixture: ComponentFixture<LastSirPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastSirPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastSirPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
