import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterEpicItem } from './voter-epic-item';

describe('VoterEpicItem', () => {
  let component: VoterEpicItem;
  let fixture: ComponentFixture<VoterEpicItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterEpicItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoterEpicItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
