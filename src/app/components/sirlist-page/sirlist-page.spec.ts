import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SIRListPage } from './sirlist-page';

describe('SIRListPage', () => {
  let component: SIRListPage;
  let fixture: ComponentFixture<SIRListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SIRListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SIRListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
