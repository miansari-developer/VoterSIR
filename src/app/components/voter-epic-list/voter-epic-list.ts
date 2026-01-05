import { Component, inject } from '@angular/core';
import { VotersEpicsService } from '../../services/voters-epics.service';
import { MatListModule } from '@angular/material/list';
import { VoterEpicItem } from '../voter-epic-item/voter-epic-item';

@Component({
  selector: 'app-voter-epic-list',
  imports: [MatListModule, VoterEpicItem],
  template: `
    <mat-list>
      @for (item of votersEpicDB.voterEpicList(); track item.id) {
      <app-voter-epic-item [index]="$index" [epicItem]="item"></app-voter-epic-item>
      }
    </mat-list>
  `,
  styleUrl: './voter-epic-list.css',
})
export class VoterEpicList {
  votersEpicDB = inject(VotersEpicsService);
}
