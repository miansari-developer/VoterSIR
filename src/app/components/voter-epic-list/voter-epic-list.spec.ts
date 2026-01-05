import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterEpicList } from './voter-epic-list';

describe('VoterEpicList', () => {
  let component: VoterEpicList;
  let fixture: ComponentFixture<VoterEpicList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterEpicList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoterEpicList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
